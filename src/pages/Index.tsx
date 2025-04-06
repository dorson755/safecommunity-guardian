import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MapComponent from "@/components/Map";
import FeatureCard from "@/components/FeatureCard";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Offender } from "@/lib/types";
import { Button } from "@/components/ui/button";
import OffenderDetails from "@/components/OffenderDetails";
import SearchResults from "@/components/SearchResults";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  Shield, 
  Bell, 
  Lock, 
  UserCheck,
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase, transformOffenderFromDB, insertDemoOffenders } from "@/integrations/supabase/client";
import StatisticsSection from "@/components/StatisticsSection";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const RESULTS_PER_PAGE = 15;

const Index = () => {
  const [searchResults, setSearchResults] = useState<Offender[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchLocations, setSearchLocations] = useState<{coordinates: [number, number]; intensity: number; id?: string}[]>([]);
  const [selectedOffenderId, setSelectedOffenderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOffender, setSelectedOffender] = useState<Offender | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const rowRefs = useRef<{[id: string]: HTMLTableRowElement | null}>({});
  
  const { registerSection, scrollToSection } = useSectionScroll();
  const mapSectionRef = registerSection('mapSection');
  const resultsSectionRef = registerSection('resultsSection');
  const detailsSectionRef = registerSection('detailsSection');
  
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
        scrollToSection('mapSection');
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

  const handleViewDetails = (offender: Offender) => {
    setSelectedOffender(offender);
    setViewingDetails(true);
    
    setTimeout(() => {
      scrollToSection('detailsSection');
    }, 100);
  };

  const handleBackToResults = () => {
    setViewingDetails(false);
    setSelectedOffender(null);
    
    setTimeout(() => {
      scrollToSection('resultsSection');
    }, 100);
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
      
      <section ref={mapSectionRef} className="py-12 md:py-20 bg-white">
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
      
      {hasSearched && !viewingDetails && (
        <section ref={resultsSectionRef} className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Search Results</h2>
              <p className="text-muted-foreground">
                Found {searchResults.length} registered offenders matching your search criteria.
              </p>
            </div>
            
            <SearchResults 
              searchResults={searchResults}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedOffenderId={selectedOffenderId}
              onViewDetails={handleViewDetails}
              hasSearched={hasSearched}
              isMobile={isMobile}
              rowRefs={rowRefs}
              resultsPerPage={RESULTS_PER_PAGE}
            />
          </div>
        </section>
      )}
      
      {viewingDetails && selectedOffender && (
        <section ref={detailsSectionRef} className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <OffenderDetails 
              offender={selectedOffender}
              onBack={handleBackToResults}
            />
          </div>
        </section>
      )}
      
      {!viewingDetails && (
        <>
          <StatisticsSection />
          
          <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </>
      )}
      
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
