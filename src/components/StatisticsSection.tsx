import React, { useState, useEffect, useRef } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";

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

const OffenseTypeChart = ({ data, loading, timeRange }: { 
  data: any[] | null;
  loading: boolean;
  timeRange: string;
}) => {
  const isMobile = useIsMobile();
  
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
      <PieChart margin={{ top: 0, right: isMobile ? 0 : 20, bottom: isMobile ? 20 : 20, left: isMobile ? 0 : 20 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={isMobile ? 50 : 80}
          fill="#8884d8"
          dataKey="count"
          nameKey="name"
          label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
          layout="horizontal"
          verticalAlign="bottom" 
          align="center"
          wrapperStyle={{ 
            width: '100%', 
            paddingTop: '10px',
            overflowWrap: 'break-word',
            fontSize: isMobile ? '10px' : '12px'
          }}
          formatter={(value, entry, index) => {
            if (isMobile && value.length > 10) {
              return `${value.substring(0, 10)}...`;
            }
            return value;
          }}
        />
        <Tooltip wrapperStyle={isMobile ? { fontSize: '10px' } : {}} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const StatusDistributionChart = ({ data, loading, timeRange }: {
  data: any[] | null;
  loading: boolean;
  timeRange: string;
}) => {
  const isMobile = useIsMobile();
  
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
      <BarChart 
        data={data} 
        layout="vertical" 
        margin={{ 
          top: 5, 
          right: isMobile ? 10 : 20, 
          bottom: isMobile ? 5 : 20, 
          left: isMobile ? 50 : 80 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" fontSize={isMobile ? 10 : 12} />
        <YAxis 
          dataKey="name" 
          type="category" 
          width={isMobile ? 50 : 80} 
          fontSize={isMobile ? 10 : 12}
          tick={{ fontSize: isMobile ? 10 : 12 }}
        />
        <Tooltip wrapperStyle={isMobile ? { fontSize: '10px' } : {}} />
        <Legend 
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? { 
            fontSize: '10px', 
            paddingTop: '10px',
            width: '100%',
            overflowWrap: 'break-word'
          } : {}}
        />
        <Bar dataKey="count" fill={COLORS[0]} name="Offenders" maxBarSize={isMobile ? 30 : 40} />
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
  data: any[] | null;
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
  const isMobile = useIsMobile();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - i);
  
  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year));
    setTimeout(() => fetchStatistics(), 0);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(parseInt(month));
    setTimeout(() => fetchStatistics(), 0);
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
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-2 mb-4 border-b pb-4`}>
          {offenseTypes.map((type, index) => (
            <button
              key={type}
              data-active={activeChart === type}
              className={`flex flex-1 flex-col justify-center gap-1 px-2 py-1 text-left rounded-md border text-xs sm:text-sm
                ${activeChart === type ? 'bg-muted/50 border-primary' : 'hover:bg-muted/20'}`}
              onClick={() => {
                setActiveChart(type);
                if (!selectedOffenseTypes.includes(type)) {
                  setSelectedOffenseTypes([...selectedOffenseTypes, type]);
                }
              }}
            >
              <span className="text-xs text-muted-foreground truncate">
                {type}
              </span>
              <span className="text-sm sm:text-base font-bold leading-none">
                {totals[type] ? totals[type].toLocaleString() : "0"}
              </span>
            </button>
          ))}
        </div>
        
        <div className={`flex ${isMobile ? 'flex-wrap' : 'flex-nowrap'} gap-1 mb-4`}>
          <Button
            variant={selectedOffenseTypes.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedOffenseTypes([])}
            className="text-xs"
          >
            All
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
              className="text-xs truncate max-w-[100px] sm:max-w-none"
              style={{ 
                borderColor: COLORS[index % COLORS.length], 
                color: selectedOffenseTypes.includes(type) ? 'white' : COLORS[index % COLORS.length],
                backgroundColor: selectedOffenseTypes.includes(type) ? COLORS[index % COLORS.length] : 'transparent'
              }}
            >
              {isMobile ? type.substring(0, 8) + (type.length > 8 ? '..' : '') : type}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 20, 
              left: isMobile ? 0 : 10, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              minTickGap={isMobile ? 30 : 20}
              tick={{ fontSize: isMobile ? 9 : 12 }}
              height={isMobile ? 30 : 40}
              tickMargin={isMobile ? 5 : 10}
            />
            <YAxis 
              allowDecimals={false} 
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 25 : 40}
            />
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
                  dot={activeChart === type ? { r: isMobile ? 2 : 4 } : { r: isMobile ? 1 : 3 }}
                  activeDot={{ r: isMobile ? 4 : 8 }}
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
  const [overallLoading, setOverallLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [totalOffenders, setTotalOffenders] = useState(0);
  const [highRiskCount, setHighRiskCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [offenseTypeData, setOffenseTypeData] = useState<any[] | null>(null);
  const [statusData, setStatusData] = useState<any[] | null>(null);
  const [timelineData, setTimelineData] = useState<any[] | null>(null);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [selectedOffenseTypes, setSelectedOffenseTypes] = useState<string[]>([]);
  const [allOffenseTypes, setAllOffenseTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const isMobile = useIsMobile();
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - i);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year));
    setTimeout(() => fetchChartStatistics(), 0);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(parseInt(month));
    setTimeout(() => fetchChartStatistics(), 0);
  };
  
  const fetchOverallStatistics = async () => {
    if (!overallLoading) return;
    
    try {
      setOverallLoading(true);
      
      const { count: totalCount, error: totalError } = await supabase
        .from('offenders')
        .select('*', { count: 'exact', head: true });
      
      if (totalError) throw totalError;
      
      const { data: highRiskData, error: highRiskError } = await supabase
        .from('offenders')
        .select('*')
        .or('offense_type.ilike.%assault%,offense_type.ilike.%child%');
      
      if (highRiskError) throw highRiskError;
      
      const { data: activeData, error: activeError } = await supabase
        .from('offenders')
        .select('*')
        .eq('registration_status', 'active');
      
      if (activeError) throw activeError;
      
      setTotalOffenders(totalCount || 0);
      setHighRiskCount(highRiskData?.length || 0);
      setActiveCount(activeData?.length || 0);
      
    } catch (error) {
      console.error("Error fetching overall statistics:", error);
    } finally {
      setOverallLoading(false);
    }
  };
  
  const fetchChartStatistics = async () => {
    try {
      setChartLoading(true);
      
      let offenseQuery = supabase.from('offenders').select('offense_type, conviction_date');
      
      offenseQuery = applyTimeRangeFilter(offenseQuery, timeRange, selectedYear, selectedMonth);

      const { data: offenseData, error: offenseError } = await offenseQuery;
      
      if (offenseError) throw offenseError;
      
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
      
      const offenseTypes = Object.keys(offenseMap);
      setAllOffenseTypes(offenseTypes);
      
      if (selectedOffenseTypes.length === 0 && offenseTypes.length > 0) {
        const mostCommonType = processedOffenseData.length > 0 ? processedOffenseData[0].name : offenseTypes[0];
        setSelectedOffenseTypes([mostCommonType]);
      }
      
      let statusQuery = supabase.from('offenders').select('registration_status, conviction_date');
      
      statusQuery = applyTimeRangeFilter(statusQuery, timeRange, selectedYear, selectedMonth);
      
      const { data: statusData, error: statusError } = await statusQuery;
      
      if (statusError) throw statusError;
      
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
      
      const { data: convictionData, error: convictionError } = await supabase
        .from('offenders')
        .select('conviction_date, offense_type');
      
      if (convictionError) throw convictionError;
      
      const timelineMap = new Map<string, Record<string, number>>();
      
      const getDateKey = (dateStr: string | null, range: string): string => {
        if (!dateStr) return '';
        
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return '';
        
        switch (range) {
          case 'month':
            if (date.getFullYear() !== selectedYear || date.getMonth() !== selectedMonth) {
              return '';
            }
            return dateStr.split('T')[0];
            
          case 'year':
            if (date.getFullYear() !== selectedYear) {
              return '';
            }
            return `${selectedYear}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            
          case '5years':
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            if (date < fiveYearsAgo) {
              return '';
            }
            return `${date.getFullYear()}-${Math.floor(date.getMonth() / 3) + 1}`;
            
          case 'all':
          default:
            return `${date.getFullYear()}`;
        }
      };
      
      const generateDefaultTimelineDates = (range: string): string[] => {
        const dates: string[] = [];
        
        switch (range) {
          case 'month':
            const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
              const dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              dates.push(dateStr);
            }
            break;
            
          case 'year':
            for (let month = 0; month < 12; month++) {
              const dateStr = `${selectedYear}-${(month + 1).toString().padStart(2, '0')}`;
              dates.push(dateStr);
            }
            break;
            
          case '5years':
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
            const endYear = new Date().getFullYear();
            const startYear = endYear - 39;
            for (let year = startYear; year <= endYear; year++) {
              dates.push(`${year}`);
            }
            break;
        }
        
        return dates;
      };
      
      const defaultDates = generateDefaultTimelineDates(timeRange);
      defaultDates.forEach(dateKey => {
        const entry: Record<string, number> = {};
        offenseTypes.forEach(type => {
          entry[type] = 0;
        });
        timelineMap.set(dateKey, entry);
      });
      
      if (convictionData) {
        convictionData.forEach(item => {
          if (!item.conviction_date || !item.offense_type) return;
          
          const dateKey = getDateKey(item.conviction_date, timeRange);
          if (!dateKey) return;
          
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
      
      const processedTimelineData: OffenseTimelineData[] = Array.from(timelineMap.entries())
        .map(([date, typeCountMap]) => {
          const entry: OffenseTimelineData = { date };
          
          offenseTypes.forEach(type => {
            entry[type] = typeCountMap[type] || 0;
          });
          
          return entry;
        })
        .sort((a, b) => a.date.localeCompare(b.date));
      
      setOffenseTypeData(processedOffenseData);
      setStatusData(processedStatusData);
      setTimelineData(processedTimelineData);
      
    } catch (error) {
      console.error("Error fetching chart statistics:", error);
    } finally {
      setChartLoading(false);
    }
  };

  const applyTimeRangeFilter = (query: any, timeRange: string, selectedYear: number, selectedMonth: number) => {
    switch (timeRange) {
      case 'month':
        const startOfMonth = new Date(selectedYear, selectedMonth, 1).toISOString();
        const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59).toISOString();
        return query.gte('conviction_date', startOfMonth).lte('conviction_date', endOfMonth);
        
      case 'year':
        const startOfYear = new Date(selectedYear, 0, 1).toISOString();
        const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59).toISOString();
        return query.gte('conviction_date', startOfYear).lte('conviction_date', endOfYear);
        
      case '5years':
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        return query.gte('conviction_date', fiveYearsAgo.toISOString());
        
      case 'all':
      default:
        return query;
    }
  };
  
  useEffect(() => {
    fetchOverallStatistics();
    fetchChartStatistics();
  }, []);
  
  useEffect(() => {
    fetchChartStatistics();
  }, [timeRange, selectedYear, selectedMonth]);

  const showYearSelector = timeRange === 'year' || timeRange === 'month';
  const showMonthSelector = timeRange === 'month';

  return (
    <section className="py-12 md:py-20 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Registry Statistics</h2>
          <p className="text-muted-foreground mb-6">
            Current analytics and trends from our offender registry database.
          </p>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full flex flex-col gap-4">
                <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                    <TabsTrigger value="5years">5 Years</TabsTrigger>
                    <TabsTrigger value="all">All Time</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className={`flex ${isMobile ? 'flex-wrap' : 'flex-nowrap'} gap-2`}>
                  {showYearSelector && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={`${isMobile ? 'w-full' : 'w-[100px]'} flex justify-between`}>
                          {selectedYear}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0" align="start">
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
                  )}
                  
                  {showMonthSelector && (
                    <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                      <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[120px]'}`}>
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard 
            title="Total Registered Offenders" 
            value={totalOffenders.toLocaleString()}
            loading={overallLoading}
            icon={<Badge>Total</Badge>}
          />
          <StatsCard 
            title="High Risk Offenders" 
            value={highRiskCount.toLocaleString()}
            description={`${totalOffenders ? Math.round((highRiskCount / totalOffenders) * 100) : 0}% of total registered`}
            loading={overallLoading}
            icon={<Badge variant="destructive">High Risk</Badge>}
          />
          <StatsCard 
            title="Active Cases" 
            value={activeCount.toLocaleString()}
            description="Currently active registrations"
            loading={overallLoading}
            icon={<Badge variant="outline">Active</Badge>}
          />
          <StatsCard 
            title="Compliance Rate" 
            value={overallLoading ? "—" : `${totalOffenders ? Math.round((activeCount / totalOffenders) * 100) : 0}%`}
            description="Reporting compliance"
            loading={overallLoading}
            icon={<Badge variant="secondary">Compliance</Badge>}
          />
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mb-6">
          <Card className={`col-span-1 ${isMobile ? 'h-[350px]' : 'h-[400px]'} overflow-hidden`}>
            <CardHeader>
              <CardTitle>Offense Type Distribution</CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'h-[280px]' : 'h-[320px]'} relative overflow-hidden`}>
              <div className="h-full w-full">
                <OffenseTypeChart data={offenseTypeData} loading={chartLoading} timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
          
          <Card className={`col-span-1 ${isMobile ? 'h-[350px]' : 'h-[400px]'} overflow-hidden`}>
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'h-[280px]' : 'h-[320px]'} px-1 relative overflow-hidden`}>
              <div className="h-full w-full mx-[3px]">
                <StatusDistributionChart data={statusData} loading={chartLoading} timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </div>
          
        <div className="grid grid-cols-1">
          <Card className="col-span-1 h-auto overflow-hidden">
            <CardHeader>
              <CardTitle>Offenses Over Time</CardTitle>
            </CardHeader>
            <CardContent className={`${isMobile ? 'h-[400px]' : 'h-[500px]'} relative overflow-hidden`}>
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
                className="h-full w-full"
              >
                <OffenseTimelineChart 
                  data={timelineData} 
                  loading={chartLoading} 
                  timeRange={timeRange}
                  setTimeRange={setTimeRange}
                  selectedOffenseTypes={selectedOffenseTypes}
                  setSelectedOffenseTypes={setSelectedOffenseTypes}
                  offenseTypes={allOffenseTypes}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  fetchStatistics={fetchChartStatistics}
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
