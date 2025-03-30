
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import SearchResultsSection from "@/components/SearchResultsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Offender } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { transformOffenderFromDB } from "@/integrations/supabase/client";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Offender[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(false);
  
  useEffect(() => {
    // Check if there is data in the database
    const checkDataAvailability = async () => {
      try {
        const { count, error } = await supabase
          .from('offenders')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        
        setDataAvailable(count !== null && count > 0);
      } catch (error) {
        console.error("Error checking data availability:", error);
      }
    };
    
    checkDataAvailability();
  }, []);

  const handleSearch = async (query: string, filters: any) => {
    try {
      // Create base query
      let supaQuery = supabase.from('offenders').select('*');
      
      // Add filters if provided
      if (query) {
        supaQuery = supaQuery.or(`name.ilike.%${query}%,offense_type.ilike.%${query}%,last_known_address.ilike.%${query}%`);
      }
      
      if (filters.offenseType !== "all") {
        supaQuery = supaQuery.ilike('offense_type', `%${filters.offenseType}%`);
      }
      
      if (filters.status !== "all") {
        supaQuery = supaQuery.eq('registration_status', filters.status);
      }
      
      // Execute query
      const { data, error } = await supaQuery;
      
      if (error) throw error;
      
      // Transform data to Offender type
      const results = data.map(offender => transformOffenderFromDB(offender));
      
      setSearchResults(results);
      setHasSearched(true);
      
      // Log the search
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
      setHasSearched(true);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />
      
      {/* Map Section */}
      <MapSection dataAvailable={dataAvailable} />
      
      {/* Search Results Section */}
      <SearchResultsSection 
        hasSearched={hasSearched} 
        searchResults={searchResults} 
        onOpenAuthModal={() => setIsAuthModalOpen(true)} 
        getStatusColor={getStatusColor}
      />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* CTA Section */}
      <CTASection onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      
      {/* Footer */}
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
