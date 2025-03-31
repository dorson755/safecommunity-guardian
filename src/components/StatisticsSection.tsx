
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

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

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

const GeographicalDistributionChart = ({ data, loading }: {
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
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke={COLORS[0]} name="Offenders" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const StatisticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [totalOffenders, setTotalOffenders] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [offenseTypeData, setOffenseTypeData] = useState<any[] | null>(null);
  const [statusData, setStatusData] = useState<any[] | null>(null);
  const [regionData, setRegionData] = useState<any[] | null>(null);
  
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        
        // Mock data - in a real application, these would be actual database queries
        const mockOffenseTypeData = [
          { name: "Sexual Assault", count: 120 },
          { name: "Child Abuse", count: 86 },
          { name: "Stalking", count: 64 },
          { name: "Other", count: 42 }
        ];
        
        const mockStatusData = [
          { name: "Active", count: 180 },
          { name: "Pending", count: 75 },
          { name: "Expired", count: 57 }
        ];
        
        const mockRegionData = [
          { name: "Downtown", count: 85 },
          { name: "North District", count: 45 },
          { name: "South District", count: 65 },
          { name: "East District", count: 35 },
          { name: "West District", count: 82 }
        ];
        
        // Simulate database count
        const mockTotalCount = 312;
        const mockHighRiskCount = 87;
        
        // Simulate network delay
        setTimeout(() => {
          setTotalOffenders(mockTotalCount);
          setHighRiskCount(mockHighRiskCount);
          setOffenseTypeData(mockOffenseTypeData);
          setStatusData(mockStatusData);
          setRegionData(mockRegionData);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };
    
    fetchStatistics();
  }, []);

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
            value={loading ? "—" : "1,245"}
            description="Updated daily"
            loading={loading}
            icon={<Badge variant="outline">Active</Badge>}
          />
          <StatsCard 
            title="Compliance Rate" 
            value={loading ? "—" : "92%"}
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
              <CardTitle>Geographical Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer config={{ height: 300 }}>
                <GeographicalDistributionChart data={regionData} loading={loading} />
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
