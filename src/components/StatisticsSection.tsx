
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

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
  [offenseType: string]: string | number;
};

const OffenseTimelineChart = ({ 
  data, 
  loading, 
  timeRange, 
  setTimeRange, 
  selectedOffenseTypes, 
  setSelectedOffenseTypes,
  offenseTypes,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  fetchStatistics
}: {
  data: OffenseTimelineData[] | null;
  loading: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  selectedOffenseTypes: string[];
  setSelectedOffenseTypes: (types: string[]) => void;
  offenseTypes: string[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  fetchStatistics: () => Promise<void>;
}) => {
  const [activeChart, setActiveChart] = useState<string>(selectedOffenseTypes[0] || (offenseTypes.length > 0 ? offenseTypes[0] : ""));

  // Generate years array for selector (last 40 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - i);
  
  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year));
    fetchStatistics();
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(parseInt(month));
    fetchStatistics();
  };

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

  // Calculate totals for each offense type
  const totals: Record<string, number> = {};
  offenseTypes.forEach(type => {
    totals[type] = data.reduce((acc, item) => acc + (Number(item[type]) || 0), 0);
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    switch (timeRange) {
      case 'month':
        return date.toLocaleDateString('en-US', { day: 'numeric' });
      case 'year':
        return date.toLocaleDateString('en-US', { month: 'short' });
      case '5years':
        return `${date.toLocaleDateString('en-US', { year: 'numeric' })} Q${Math.ceil((date.getMonth() + 1) / 3)}`;
      default:
        return date.toLocaleDateString('en-US', { year: 'numeric' });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
              <TabsTrigger value="5years">5 Years</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Time period selectors */}
          {timeRange === 'year' && (
            <div className="mb-4 w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-[120px] flex justify-between">
                    {selectedYear}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <ScrollArea className="h-72">
                    <div className="p-1">
                      {years.map((year) => (
                        <Button
                          key={year}
                          variant="ghost"
                          className={`w-full justify-start ${year === selectedYear ? 'bg-muted' : ''}`}
                          onClick={() => handleYearChange(year.toString())}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {timeRange === 'month' && (
            <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-[120px] flex justify-between">
                    {selectedYear}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end">
                  <ScrollArea className="h-72">
                    <div className="p-1">
                      {years.map((year) => (
                        <Button
                          key={year}
                          variant="ghost"
                          className={`w-full justify-start ${year === selectedYear ? 'bg-muted' : ''}`}
                          onClick={() => handleYearChange(year.toString())}
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        {/* Type selection buttons */}
        <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
          {offenseTypes.map((type, index) => (
            <button
              key={type}
              data-active={activeChart === type}
              className={`flex flex-1 flex-col justify-center gap-1 px-4 py-2 text-left rounded-md border 
                ${activeChart === type ? 'bg-muted/50 border-primary' : 'hover:bg-muted/20'}`}
              onClick={() => {
                setActiveChart(type);
                if (!selectedOffenseTypes.includes(type)) {
                  setSelectedOffenseTypes([...selectedOffenseTypes, type]);
                }
              }}
            >
              <span className="text-xs text-muted-foreground">
                {type}
              </span>
              <span className="text-lg font-bold leading-none">
                {totals[type] ? totals[type].toLocaleString() : "0"}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
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
              style={{ 
                borderColor: COLORS[index % COLORS.length], 
                color: selectedOffenseTypes.includes(type) ? 'white' : COLORS[index % COLORS.length],
                backgroundColor: selectedOffenseTypes.includes(type) ? COLORS[index % COLORS.length] : 'transparent'
              }}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              minTickGap={20}
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatDate(value)}
                />
              }
            />
            {offenseTypes.map((type, index) => (
              (selectedOffenseTypes.length === 0 || selectedOffenseTypes.includes(type)) && (
                <Line 
                  key={type} 
                  type="monotone" 
                  dataKey={type} 
                  stroke={COLORS[index % COLORS.length]} 
                  name={type} 
                  strokeWidth={activeChart === type ? 3 : 2}
                  dot={activeChart === type ? { r: 4 } : { r: 3 }}
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
  const [allOffenseTypes, setAllOffenseTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  
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
      offenseData?.forEach(item => {
        if (!item.offense_type) return;
        const type = item.offense_type;
        offenseMap[type] = (offenseMap[type] || 0) + 1;
      });
      
      const processedOffenseData = Object.entries(offenseMap).map(([name, count]) => ({
        name,
        count
      })).sort((a, b) => b.count - a.count);
      
      // Extract all unique offense types
      const offenseTypes = Object.keys(offenseMap);
      setAllOffenseTypes(offenseTypes);
      
      // If no offense type is selected, select the most common one
      if (selectedOffenseTypes.length === 0 && offenseTypes.length > 0) {
        const mostCommonType = processedOffenseData.length > 0 ? processedOffenseData[0].name : offenseTypes[0];
        setSelectedOffenseTypes([mostCommonType]);
      }
      
      // Get status distribution
      const { data: statusData, error: statusError } = await supabase
        .from('offenders')
        .select('registration_status');
      
      if (statusError) throw statusError;
      
      // Process status data
      const statusMap: Record<string, number> = {};
      statusData?.forEach(item => {
        if (!item.registration_status) return;
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
      const timelineMap = new Map<string, Record<string, number>>();
      
      // Helper function to get date key based on time range
      const getDateKey = (dateStr: string | null, range: string): string => {
        if (!dateStr) return '';
        
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return ''; // Invalid date
        
        switch (range) {
          case 'month':
            // For month view, check if the date matches selected year and month
            if (date.getFullYear() !== selectedYear || date.getMonth() !== selectedMonth) {
              return '';
            }
            // Format as YYYY-MM-DD
            return dateStr.split('T')[0]; // YYYY-MM-DD
            
          case 'year':
            // For year view, check if the date is in the selected year
            if (date.getFullYear() !== selectedYear) {
              return '';
            }
            // Format as YYYY-MM
            return `${selectedYear}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            
          case '5years':
            // Format as YYYY-Q for the last 5 years
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            if (date < fiveYearsAgo) {
              return '';
            }
            return `${date.getFullYear()}-${Math.floor(date.getMonth() / 3) + 1}`;
            
          case 'all':
          default:
            // Format as YYYY for all time
            return `${date.getFullYear()}`;
        }
      };
      
      // Create default timeline entries for all time periods
      const generateDefaultTimelineDates = (range: string): string[] => {
        const dates: string[] = [];
        
        switch (range) {
          case 'month':
            // Generate all days in selected month
            const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
              const dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              dates.push(dateStr);
            }
            break;
            
          case 'year':
            // Generate all months in selected year
            for (let month = 0; month < 12; month++) {
              const dateStr = `${selectedYear}-${(month + 1).toString().padStart(2, '0')}`;
              dates.push(dateStr);
            }
            break;
            
          case '5years':
            // Generate quarters for the last 5 years
            const now = new Date();
            const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
            for (let yearOffset = 5; yearOffset >= 0; yearOffset--) {
              const year = now.getFullYear() - yearOffset;
              const quarters = yearOffset === 0 ? currentQuarter : 4;
              for (let quarter = 1; quarter <= quarters; quarter++) {
                dates.push(`${year}-${quarter}`);
              }
            }
            break;
            
          case 'all':
            // Generate last 40 years
            const endYear = new Date().getFullYear();
            const startYear = endYear - 39;
            for (let year = startYear; year <= endYear; year++) {
              dates.push(`${year}`);
            }
            break;
        }
        
        return dates;
      };
      
      // Setup default timeline with zero values for all offense types
      const defaultDates = generateDefaultTimelineDates(timeRange);
      defaultDates.forEach(dateKey => {
        const entry: Record<string, number> = {};
        offenseTypes.forEach(type => {
          entry[type] = 0;
        });
        timelineMap.set(dateKey, entry);
      });
      
      // Now add the actual data
      if (convictionData) {
        convictionData.forEach(item => {
          if (!item.conviction_date || !item.offense_type) return;
          
          const dateKey = getDateKey(item.conviction_date, timeRange);
          if (!dateKey) return; // Skip if outside of the time range
          
          if (!timelineMap.has(dateKey)) {
            const entry: Record<string, number> = {};
            offenseTypes.forEach(type => {
              entry[type] = 0;
            });
            timelineMap.set(dateKey, entry);
          }
          
          const offenseType = item.offense_type;
          const currentData = timelineMap.get(dateKey)!;
          currentData[offenseType] = (currentData[offenseType] || 0) + 1;
        });
      }
      
      // Convert map to array and ensure all offense types are represented
      const processedTimelineData: OffenseTimelineData[] = Array.from(timelineMap.entries())
        .map(([date, typeCountMap]) => {
          const entry: OffenseTimelineData = { date };
          
          // Initialize all offense types with 0
          offenseTypes.forEach(type => {
            entry[type] = typeCountMap[type] || 0;
          });
          
          return entry;
        })
        .sort((a, b) => a.date.localeCompare(b.date)); // Sort by date
      
      console.log('Timeline data:', processedTimelineData);
      
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
  
  // Refetch timeline data when time range, selected year, or selected month changes
  useEffect(() => {
    fetchStatistics();
  }, [timeRange, selectedYear, selectedMonth]);

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
            value={loading ? "—" : `${totalOffenders ? Math.round((activeCount / totalOffenders) * 100) : 0}%`}
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
              <div className="h-full w-full">
                <OffenseTypeChart data={offenseTypeData} loading={loading} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full">
                <StatusDistributionChart data={statusData} loading={loading} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>Offenses Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ChartContainer 
                config={{
                  ...Object.fromEntries(
                    (allOffenseTypes || []).map((type, i) => [
                      type, 
                      { 
                        label: type,
                        color: COLORS[i % COLORS.length]
                      }
                    ])
                  )
                }}
                className="h-[380px] w-full"
              >
                <OffenseTimelineChart 
                  data={timelineData} 
                  loading={loading} 
                  timeRange={timeRange}
                  setTimeRange={setTimeRange}
                  selectedOffenseTypes={selectedOffenseTypes}
                  setSelectedOffenseTypes={setSelectedOffenseTypes}
                  offenseTypes={allOffenseTypes}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  fetchStatistics={fetchStatistics}
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
