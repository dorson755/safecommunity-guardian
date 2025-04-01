
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import ChartContainer from "./ChartContainer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#5b21b6', '#9333ea', '#c084fc', '#a855f7'];

const StatsCard = ({ title, value, description, loading, icon }: { 
  title: string; 
  value: string | number; 
  description?: string;
  loading: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-12 w-24 bg-muted animate-pulse rounded-md"></div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const OffenseTypeChart = ({ data, loading }: { 
  data: any[] | null;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const StatusDistributionChart = ({ data, loading }: {
  data: any[] | null;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={100} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={COLORS[0]} name="Offenders" />
      </BarChart>
    </ResponsiveContainer>
  );
};

type OffenseTimelineData = {
  date: string;
  count: number;
  offenseType: string;
}

const OffenseTimelineChart = ({ data, loading, timeRange, setTimeRange, selectedOffenseTypes, setSelectedOffenseTypes }: {
  data: OffenseTimelineData[] | null;
  loading: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  selectedOffenseTypes: string[];
  setSelectedOffenseTypes: (types: string[]) => void;
}) => {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  // Get unique offense types
  const offenseTypes = Array.from(new Set(data.map(item => item.offenseType)));

  // Process data by grouping by date
  const processedData: Record<string, any> = {};
  data.forEach(item => {
    if (!processedData[item.date]) {
      processedData[item.date] = { date: item.date };
      // Initialize all offense types to 0
      offenseTypes.forEach(type => {
        processedData[item.date][type] = 0;
      });
    }
    
    // Only include selected offense types or all if none selected
    if (selectedOffenseTypes.length === 0 || selectedOffenseTypes.includes(item.offenseType)) {
      processedData[item.date][item.offenseType] += item.count;
    }
  });

  const chartData = Object.values(processedData).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap gap-2 mb-4">
        <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="5years">5 Years</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap gap-2 mb-4 w-full">
          <Button
            variant={selectedOffenseTypes.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedOffenseTypes([])}
            className="text-xs"
          >
            All Types
          </Button>
          {offenseTypes.map((type, index) => (
            <Button
              key={type}
              variant={selectedOffenseTypes.includes(type) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (selectedOffenseTypes.includes(type)) {
                  setSelectedOffenseTypes(selectedOffenseTypes.filter(t => t !== type));
                } else {
                  setSelectedOffenseTypes([...selectedOffenseTypes, type]);
                }
              }}
              className="text-xs"
              style={{ borderColor: COLORS[index % COLORS.length], color: selectedOffenseTypes.includes(type) ? 'white' : COLORS[index % COLORS.length] }}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {offenseTypes.map((type, index) => (
              (selectedOffenseTypes.length === 0 || selectedOffenseTypes.includes(type)) && (
                <Line 
                  key={type} 
                  type="monotone" 
                  dataKey={type} 
                  stroke={COLORS[index % COLORS.length]} 
                  name={type} 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatisticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [totalOffenders, setTotalOffenders] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [offenseTypeData, setOffenseTypeData] = useState<any[] | null>(null);
  const [statusData, setStatusData] = useState<any[] | null>(null);
  const [timelineData, setTimelineData] = useState<OffenseTimelineData[] | null>(null);
  const [timeRange, setTimeRange] = useState<string>("year");
  const [selectedOffenseTypes, setSelectedOffenseTypes] = useState<string[]>([]);
  
  const fetchStatistics = async () => {
    try {
      setLoading(true);
      
      // Get total count
      const { count: totalCount, error: totalError } = await supabase
        .from('offenders')
        .select('*', { count: 'exact', head: true });
      
      if (totalError) throw totalError;
      
      // Get high risk count (we'll define high risk as offense_type containing 'assault' or 'child')
      const { data: highRiskData, error: highRiskError } = await supabase
        .from('offenders')
        .select('*')
        .or('offense_type.ilike.%assault%,offense_type.ilike.%child%');
      
      if (highRiskError) throw highRiskError;
      
      // Get active cases count
      const { data: activeData, error: activeError } = await supabase
        .from('offenders')
        .select('*')
        .eq('registration_status', 'active');
      
      if (activeError) throw activeError;
      
      // Get offense type distribution
      const { data: offenseData, error: offenseError } = await supabase
        .from('offenders')
        .select('offense_type');
      
      if (offenseError) throw offenseError;
      
      // Process offense type data
      const offenseMap: Record<string, number> = {};
      offenseData.forEach(item => {
        const type = item.offense_type;
        offenseMap[type] = (offenseMap[type] || 0) + 1;
      });
      
      const processedOffenseData = Object.entries(offenseMap).map(([name, count]) => ({
        name,
        count
      })).sort((a, b) => b.count - a.count);
      
      // Get status distribution
      const { data: statusData, error: statusError } = await supabase
        .from('offenders')
        .select('registration_status');
      
      if (statusError) throw statusError;
      
      // Process status data
      const statusMap: Record<string, number> = {};
      statusData.forEach(item => {
        const status = item.registration_status;
        statusMap[status] = (statusMap[status] || 0) + 1;
      });
      
      const processedStatusData = Object.entries(statusMap).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count
      }));
      
      // Get timeline data based on conviction_date
      const { data: convictionData, error: convictionError } = await supabase
        .from('offenders')
        .select('conviction_date, offense_type');
      
      if (convictionError) throw convictionError;
      
      // Process timeline data
      const timelineMap: Record<string, Record<string, number>> = {};
      
      // Convert date based on selected time range
      convictionData.forEach(item => {
        if (!item.conviction_date) return;
        
        let dateKey;
        const convictionDate = new Date(item.conviction_date);
        
        // Format the date according to the time range
        switch (timeRange) {
          case 'month':
            // Format as YYYY-MM-DD but only include data from the past month
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            if (convictionDate < oneMonthAgo) return;
            dateKey = convictionDate.toISOString().split('T')[0];
            break;
          case 'year':
            // Format as YYYY-MM for the past year
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            if (convictionDate < oneYearAgo) return;
            dateKey = `${convictionDate.getFullYear()}-${(convictionDate.getMonth() + 1).toString().padStart(2, '0')}`;
            break;
          case '5years':
            // Format as YYYY for the past 5 years
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            if (convictionDate < fiveYearsAgo) return;
            dateKey = `${convictionDate.getFullYear()}-${Math.floor(convictionDate.getMonth() / 3) + 1}Q`;
            break;
          case 'all':
          default:
            // Format as YYYY for all time
            dateKey = `${convictionDate.getFullYear()}`;
            break;
        }
        
        if (!timelineMap[dateKey]) {
          timelineMap[dateKey] = {};
        }
        
        const offenseType = item.offense_type;
        timelineMap[dateKey][offenseType] = (timelineMap[dateKey][offenseType] || 0) + 1;
      });
      
      // Convert to array format for chart
      const processedTimelineData: OffenseTimelineData[] = [];
      Object.entries(timelineMap).forEach(([date, offenses]) => {
        Object.entries(offenses).forEach(([offenseType, count]) => {
          processedTimelineData.push({
            date,
            offenseType,
            count
          });
        });
      });
      
      // Update state with fetched data
      setTotalOffenders(totalCount || 0);
      setHighRiskCount(highRiskData?.length || 0);
      setActiveCount(activeData?.length || 0);
      setOffenseTypeData(processedOffenseData);
      setStatusData(processedStatusData);
      setTimelineData(processedTimelineData);
      
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStatistics();
  }, []);
  
  // Refetch timeline data when time range changes
  useEffect(() => {
    fetchStatistics();
  }, [timeRange]);

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Registry Statistics</h2>
          <p className="text-muted-foreground">
            Current analytics and trends from our offender registry database.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard 
            title="Total Registered Offenders" 
            value={totalOffenders.toLocaleString()}
            loading={loading}
            icon={<Badge>Total</Badge>}
          />
          <StatsCard 
            title="High Risk Offenders" 
            value={highRiskCount.toLocaleString()}
            description={`${totalOffenders ? Math.round((highRiskCount / totalOffenders) * 100) : 0}% of total registered`}
            loading={loading}
            icon={<Badge variant="destructive">High Risk</Badge>}
          />
          <StatsCard 
            title="Active Cases" 
            value={activeCount.toLocaleString()}
            description="Currently active registrations"
            loading={loading}
            icon={<Badge variant="outline">Active</Badge>}
          />
          <StatsCard 
            title="Compliance Rate" 
            value={loading ? "—" : `${Math.round((activeCount / totalOffenders) * 100)}%`}
            description="Reporting compliance"
            loading={loading}
            icon={<Badge variant="secondary">Compliance</Badge>}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Offense Type Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ height: 300 }}>
                <OffenseTypeChart data={offenseTypeData} loading={loading} />
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ height: 300 }}>
                <StatusDistributionChart data={statusData} loading={loading} />
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>Offenses Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ChartContainer config={{ height: 380 }}>
                <OffenseTimelineChart 
                  data={timelineData} 
                  loading={loading} 
                  timeRange={timeRange}
                  setTimeRange={setTimeRange}
                  selectedOffenseTypes={selectedOffenseTypes}
                  setSelectedOffenseTypes={setSelectedOffenseTypes}
                />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
