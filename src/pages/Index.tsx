import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MapComponent from "@/components/Map";
import FeatureCard from "@/components/FeatureCard";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Offender } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Shield, 
  Search, 
  Map, 
  Bell, 
  Lock, 
  UserCheck,
  Calendar,
  MapPin,
  FileText,
  ArrowRight,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase, transformOffenderFromDB, insertDemoOffenders } from "@/integrations/supabase/client";
import StatisticsSection from "@/components/StatisticsSection";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const RESULTS_PER_PAGE = 15;

const Index = () => {
  const [searchResults, setSearchResults] = useState<Offender[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchLocations, setSearchLocations] = useState<{coordinates: [number, number]; intensity: number; id?: string}[]>([]);
  const [selectedOffenderId, setSelectedOffenderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const rowRefs = useRef<{[id: string]: HTMLTableRowElement | null}>({});
  
  useEffect(() => {
    const checkDataAvailability = async () => {
      try {
        const { count, error } = await supabase
          .from('offenders')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        
        const hasData = count !== null && count > 0;
        setDataAvailable(hasData);
        
        if (count !== null && count < 25) {
          const result = await insertDemoOffenders();
          if (result.success) {
            toast({
              title: "Demo Data Added",
              description: "Additional demo records have been added for demonstration purposes.",
              duration: 5000,
            });
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
      setCurrentPage(1);
      
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
      
      setTimeout(() => {
        if (mapSectionRef.current) {
          mapSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error("Error searching offenders:", error);
      setSearchResults([]);
      setSearchLocations([]);
      setHasSearched(true);
    }
  };

  const handlePointClick = (id: string) => {
    setSelectedOffenderId(id);
    
    const offenderIndex = searchResults.findIndex(o => o.id === id);
    if (offenderIndex >= 0) {
      const page = Math.floor(offenderIndex / RESULTS_PER_PAGE) + 1;
      setCurrentPage(page);
      
      setTimeout(() => {
        if (rowRefs.current[id]) {
          rowRefs.current[id]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
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
  
  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
            </PaginationItem>
          )}
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            if (
              pageNumber === 1 || 
              pageNumber === totalPages || 
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    isActive={pageNumber === currentPage}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              (pageNumber === 2 && currentPage > 3) || 
              (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return <PaginationEllipsis key={pageNumber} />;
            }
            return null;
          })}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-background"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl mx-auto h-[400px] bg-gradient-to-br from-primary/10 to-white/0 rounded-full blur-3xl opacity-60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full animate-fade-in">
              <Shield size={14} className="mr-1" /> 
              Community Protection System
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight animate-blur-in">
              Safeguard Your Community
            </h1>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Access comprehensive sex offender registry data to help protect your neighborhood and loved ones.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12 md:mb-16 animate-fade-in delay-100">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in delay-150">
            <FeatureCard
              icon={Search}
              title="Advanced Search"
              description="Find detailed information about registered offenders by name, location, or offense type."
            />
            <FeatureCard
              icon={Map}
              title="Interactive Map"
              description="Visualize offender density with our heat map technology to better understand risk areas."
            />
            <FeatureCard
              icon={Bell}
              title="Notifications"
              description="Receive alerts when registered offenders move into your specified area of interest."
            />
          </div>
        </div>
      </section>
      
      <section id="map-section" ref={mapSectionRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Offender Heat Map</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visualize the concentration of registered offenders across different geographic areas to better understand potential risk zones.
            </p>
          </div>
          
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg border">
            <MapComponent 
              heatmapData={searchLocations} 
              zoomToResults={hasSearched && searchLocations.length > 0}
              onPointClick={handlePointClick}
            />
          </div>
          
          {!dataAvailable && (
            <div className="flex justify-center mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <AlertTriangle className="inline-block mr-1 h-4 w-4" />
                Using demo data. Sign in to access the actual offender registry data.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {hasSearched && (
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Search Results</h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} registered offenders matching your search criteria.
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <>
                <div className="overflow-hidden rounded-lg border shadow-sm animate-fade-in">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Offense Type</TableHead>
                        {!isMobile && <TableHead>Status</TableHead>}
                        {!isMobile && <TableHead>Last Known Address</TableHead>}
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedResults.map((offender) => (
                        <TableRow 
                          key={offender.id}
                          ref={el => rowRefs.current[offender.id] = el}
                          className={selectedOffenderId === offender.id 
                            ? "bg-primary/10 transition-colors duration-500" 
                            : "transition-colors duration-300"}
                        >
                          <TableCell className="font-medium">{offender.name}</TableCell>
                          <TableCell>{offender.offenseType}</TableCell>
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
                          {!isMobile && <TableCell>{offender.lastKnownAddress}</TableCell>}
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setIsAuthModalOpen(true)}
                            >
                              View <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {renderPagination()}
              </>
            ) : (
              <Card className="text-center p-12 animate-fade-in">
                <CardContent>
                  <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No Results Found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}
      
      <StatisticsSection />
      
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Protection System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers multiple layers of protection to help keep your community safe and informed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white transition-shadow hover:shadow-lg">
              <CardHeader>
                <Bell className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-time Notifications</CardTitle>
                <CardDescription>
                  Stay informed with instant alerts when registered offenders move into your area.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Email and SMS notifications</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Customizable alert radius</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Status change notifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white transition-shadow hover:shadow-lg">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Data Access</CardTitle>
                <CardDescription>
                  Multiple security layers ensure data privacy while providing necessary transparency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Role-based access control</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Decentralized data storage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white transition-shadow hover:shadow-lg">
              <CardHeader>
                <UserCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Verified Information</CardTitle>
                <CardDescription>
                  All registry data is verified and regularly updated for accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Official government data sources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Regular synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Historical record tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to protect your community?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sign up for free to access full registry data, set up alerts, and help keep your neighborhood safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setIsAuthModalOpen(true)}>
              Create Free Account
            </Button>
            <Button size="lg" variant="outline">
              Learn More <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
