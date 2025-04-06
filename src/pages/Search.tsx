
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import MapComponent from "@/components/Map";
import OffenderDetails from "@/components/OffenderDetails";
import { Offender } from "@/lib/types";
import { supabase, transformOffenderFromDB, insertDemoOffenders } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AuthModal from "@/components/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const Search = () => {
  const [searchResults, setSearchResults] = useState<Offender[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchLocations, setSearchLocations] = useState<{coordinates: [number, number]; intensity: number; id?: string}[]>([]);
  const [selectedOffenderId, setSelectedOffenderId] = useState<string | null>(null);
  const [selectedOffender, setSelectedOffender] = useState<Offender | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Create refs for table rows to scroll to
  const rowRefs = useRef<{[id: string]: HTMLTableRowElement | null}>({});
  
  // Use the new section scroll hook
  const { registerSection, scrollToSection } = useSectionScroll();
  const resultsRef = registerSection('results');
  const detailsRef = registerSection('details');
  
  useEffect(() => {
    const checkDataAvailability = async () => {
      try {
        const { count, error } = await supabase
          .from('offenders')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        
        const hasData = count !== null && count > 0;
        setDataAvailable(hasData);
        
        // If we have fewer than 25 records, generate more demo data
        if (count !== null && count < 25) {
          const result = await insertDemoOffenders();
          if (result.success) {
            toast({
              title: "Demo Data Added",
              description: "Additional demo records have been added for demonstration purposes.",
              duration: 5000,
            });
            // Reload the data count
            const { count: newCount } = await supabase
              .from('offenders')
              .select('*', { count: 'exact', head: true });
            setDataAvailable(newCount !== null && newCount > 0);
          }
        }
      } catch (error) {
        console.error("Error checking data availability:", error);
      }
    };
    
    checkDataAvailability();
  }, [toast]);

  const handleSearch = async (query: string, filters: any) => {
    try {
      let supaQuery = supabase.from('offenders').select('*');
      
      if (query) {
        supaQuery = supaQuery.or(`name.ilike.%${query}%,offense_type.ilike.%${query}%,last_known_address.ilike.%${query}%`);
      }
      
      if (filters.offenseType !== "all") {
        supaQuery = supaQuery.ilike('offense_type', `%${filters.offenseType}%`);
      }
      
      if (filters.status !== "all") {
        supaQuery = supaQuery.eq('registration_status', filters.status);
      }
      
      const { data, error } = await supaQuery;
      
      if (error) throw error;
      
      const results = data.map(offender => transformOffenderFromDB(offender));
      
      setSearchResults(results);
      setHasSearched(true);
      setSelectedOffenderId(null);
      
      // Extract locations for the map
      const locations = results.map(offender => ({
        coordinates: [offender.longitude, offender.latitude] as [number, number],
        intensity: 1,
        id: offender.id
      }));
      setSearchLocations(locations);
      
      try {
        await supabase.from('search_logs').insert({
          search_query: query,
          filters: filters,
        });
      } catch (logError) {
        console.error("Error logging search:", logError);
      }
    } catch (error) {
      console.error("Error searching offenders:", error);
      setSearchResults([]);
      setSearchLocations([]);
      setHasSearched(true);
    }
  };

  const handlePointClick = (id: string) => {
    setSelectedOffenderId(id);
    
    // Scroll to the corresponding row
    if (rowRefs.current[id]) {
      rowRefs.current[id]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewDetails = (offender: Offender) => {
    setSelectedOffender(offender);
    setViewingDetails(true);
  };

  const handleBackToResults = () => {
    setViewingDetails(false);
    setSelectedOffender(null);
    
    // Instead of scrolling to top, we stay in the current section
    setTimeout(() => {
      scrollToSection('results');
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background w-full max-w-[100vw] overflow-x-hidden">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow pt-28 pb-16 w-full overflow-x-hidden px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Registry</h1>
            <p className="text-muted-foreground">
              Find registered offenders by name, offense type, or location
            </p>
          </div>
          
          {/* Search bar */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Map */}
          <div className="mb-8 border rounded-lg shadow-sm overflow-hidden">
            <div className="h-[400px] w-full">
              <MapComponent 
                heatmapData={searchLocations} 
                zoomToResults={hasSearched && searchLocations.length > 0} 
                onPointClick={handlePointClick}
              />
            </div>
          </div>
          
          {/* Offender Details or Search Results */}
          <div className="mb-6" ref={viewingDetails ? detailsRef : resultsRef}>
            {viewingDetails && selectedOffender ? (
              <OffenderDetails
                offender={selectedOffender}
                onBack={handleBackToResults}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                
                {hasSearched ? (
                  <>
                    <p className="text-muted-foreground mb-4">
                      Found {searchResults.length} registered offenders matching your search criteria.
                    </p>
                    
                    {searchResults.length > 0 ? (
                      <div className="overflow-hidden rounded-lg border shadow-sm animate-fade-in overflow-x-auto w-full">
                        <div className="w-full overflow-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Offense Type</TableHead>
                                {!isMobile && <TableHead>Status</TableHead>}
                                {!isMobile && <TableHead>Last Known Address</TableHead>}
                                <TableHead className="w-24">Details</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {searchResults.map((offender) => (
                                <TableRow 
                                  key={offender.id}
                                  ref={el => rowRefs.current[offender.id] = el}
                                  className={selectedOffenderId === offender.id 
                                    ? "bg-primary/10 transition-colors duration-500" 
                                    : "transition-colors duration-300"}
                                >
                                  <TableCell className="font-medium break-words max-w-[120px]">{offender.name}</TableCell>
                                  <TableCell className="break-words max-w-[120px]">{offender.offenseType}</TableCell>
                                  {!isMobile && (
                                    <TableCell>
                                      <Badge 
                                        variant="outline" 
                                        className={getStatusColor(offender.registrationStatus)}
                                      >
                                        {offender.registrationStatus.charAt(0).toUpperCase() + offender.registrationStatus.slice(1)}
                                      </Badge>
                                    </TableCell>
                                  )}
                                  {!isMobile && <TableCell className="break-words max-w-[200px]">{offender.lastKnownAddress}</TableCell>}
                                  <TableCell className="text-right">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleViewDetails(offender)}
                                      className="whitespace-nowrap"
                                    >
                                      View <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ) : (
                      <Card className="text-center p-12 animate-fade-in">
                        <CardContent>
                          <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <SearchIcon className="h-10 w-10 text-muted-foreground" />
                          </div>
                          <h3 className="text-xl font-semibold">No Results Found</h3>
                          <p className="text-muted-foreground mt-2">
                            Try adjusting your search terms or filters to find what you're looking for.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <div className="text-center p-12 border rounded-lg">
                    <p className="text-muted-foreground">
                      Enter a search term above to find registered offenders.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Search;
