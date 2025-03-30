
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatsCard from "./StatsCard";
import OffenseTypeChart from "./OffenseTypeChart";
import StatusDistributionChart from "./StatusDistributionChart";
import GeographicalDistributionChart from "./GeographicalDistributionChart";
import { AlertTriangle, ChartBar, TrendingUp, Info } from "lucide-react";

const StatisticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOffenders: 0,
    activeOffenders: 0,
    pendingOffenders: 0,
    expiredOffenders: 0,
  });
  const [offenseTypeData, setOffenseTypeData] = useState<{ name: string; count: number }[]>([]);
  const [statusData, setStatusData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [geographicalData, setGeographicalData] = useState<{ name: string; count: number }[]>([]);
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        
        // Fetch total counts
        const { count: totalCount, error: totalError } = await supabase
          .from('offenders')
          .select('id', { count: 'exact', head: true });
        
        if (totalError) throw totalError;
        
        // Fetch counts by status
        const { count: activeCount, error: activeError } = await supabase
          .from('offenders')
          .select('id', { count: 'exact', head: true })
          .eq('registration_status', 'active');
          
        if (activeError) throw activeError;
        
        const { count: pendingCount, error: pendingError } = await supabase
          .from('offenders')
          .select('id', { count: 'exact', head: true })
          .eq('registration_status', 'pending');
          
        if (pendingError) throw pendingError;
        
        const { count: expiredCount, error: expiredError } = await supabase
          .from('offenders')
          .select('id', { count: 'exact', head: true })
          .eq('registration_status', 'expired');
          
        if (expiredError) throw expiredError;
        
        setStats({
          totalOffenders: totalCount || 0,
          activeOffenders: activeCount || 0,
          pendingOffenders: pendingCount || 0,
          expiredOffenders: expiredCount || 0,
        });
        
        // Fetch offense types distribution
        const { data: offensesData, error: offensesError } = await supabase
          .from('offenders')
          .select('offense_type');
          
        if (offensesError) throw offensesError;
        
        if (offensesData) {
          const offenseTypes = offensesData.reduce((acc, curr) => {
            acc[curr.offense_type] = (acc[curr.offense_type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          setOffenseTypeData(
            Object.entries(offenseTypes).map(([name, count]) => ({
              name,
              count,
            }))
          );
        }
        
        // Set status distribution data for pie chart
        setStatusData([
          { name: 'Active', value: activeCount || 0, color: '#EF4444' },
          { name: 'Pending', value: pendingCount || 0, color: '#F59E0B' },
          { name: 'Expired', value: expiredCount || 0, color: '#10B981' },
        ]);
        
        // Setup geographical distribution (mocked data for now)
        // In a real application, you would query this from the database
        setGeographicalData([
          { name: 'Downtown', count: 14 },
          { name: 'East End', count: 8 },
          { name: 'West Bay', count: 12 },
          { name: 'North Shore', count: 5 },
          { name: 'South District', count: 19 },
          { name: 'Harbor Area', count: 11 },
        ]);
        
        // Check if we actually have data
        setDataAvailable((totalCount || 0) > 0);
        
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setDataAvailable(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loading Statistics...</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please wait while we gather the offender registry data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!dataAvailable) {
    return (
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Registry Statistics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <AlertTriangle className="inline-block mr-1 h-4 w-4" />
              No data available. Please sign in to access the offender registry statistics.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Registry Statistics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytics and insights about registered offenders in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Registered Offenders"
            value={stats.totalOffenders}
            description="All time"
            icon={<Info />}
          />
          <StatsCard
            title="Active Registrations"
            value={stats.activeOffenders}
            description="Currently active"
            icon={<ChartBar />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pending Review"
            value={stats.pendingOffenders}
            description="Awaiting verification"
            icon={<AlertTriangle />}
          />
          <StatsCard
            title="Registration Changes"
            value={"+5"}
            description="Last 30 days"
            icon={<TrendingUp />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <OffenseTypeChart data={offenseTypeData} />
          <StatusDistributionChart data={statusData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeographicalDistributionChart data={geographicalData} />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
