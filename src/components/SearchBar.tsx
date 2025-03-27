
import React, { useState } from "react";
import { Search, MapPin, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

interface SearchFilters {
  offenseType: string;
  status: string;
  radius: number;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    offenseType: "all",
    status: "all",
    radius: 10,
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearSearch = () => {
    setQuery("");
    setFilters({
      offenseType: "all",
      status: "all",
      radius: 10,
    });
    onSearch("", {
      offenseType: "all",
      status: "all",
      radius: 10,
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-muted-foreground">
          <Search size={18} />
        </div>
        <Input
          type="text"
          placeholder="Search by name, offense, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-28 h-12 transition-all focus-visible:ring-2 focus-visible:ring-offset-0"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-24 p-1 h-8 w-8"
            aria-label="Clear search"
          >
            <X size={16} />
          </Button>
        )}
        <div className="absolute right-1 flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFilters}
            className="p-1 h-8 w-8"
            aria-label="Show filters"
          >
            <Filter size={16} className={showFilters ? "text-primary" : ""} />
          </Button>
          <Button
            size="sm"
            onClick={handleSearch}
            className="h-8 px-3"
          >
            Search
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white/90 backdrop-blur-sm rounded-md mt-2 p-4 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <div>
            <label className="text-sm font-medium mb-1 block">Offense Type</label>
            <Select
              value={filters.offenseType}
              onValueChange={(value) => updateFilter("offenseType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select offense type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offenses</SelectItem>
                <SelectItem value="sexual assault">Sexual Assault</SelectItem>
                <SelectItem value="child abuse">Child Abuse</SelectItem>
                <SelectItem value="rape">Rape</SelectItem>
                <SelectItem value="indecent exposure">Indecent Exposure</SelectItem>
                <SelectItem value="stalking">Stalking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => updateFilter("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Search Radius (miles)</label>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-muted-foreground" />
              <Select
                value={filters.radius.toString()}
                onValueChange={(value) => updateFilter("radius", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50 miles</SelectItem>
                  <SelectItem value="100">100 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
