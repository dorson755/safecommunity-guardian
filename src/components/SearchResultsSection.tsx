
import React from "react";
import { Search, ArrowRight } from "lucide-react";
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
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Offender } from "@/lib/types";

interface SearchResultsSectionProps {
  hasSearched: boolean;
  searchResults: Offender[];
  onOpenAuthModal: () => void;
  getStatusColor: (status: string) => string;
}

const SearchResultsSection = ({ 
  hasSearched, 
  searchResults, 
  onOpenAuthModal, 
  getStatusColor 
}: SearchResultsSectionProps) => {
  
  if (!hasSearched) return null;

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Search Results</h2>
          <p className="text-muted-foreground">
            Found {searchResults.length} registered offenders matching your search criteria.
          </p>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="overflow-hidden rounded-lg border shadow-sm animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Offense Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Known Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((offender) => (
                  <TableRow key={offender.id}>
                    <TableCell className="font-medium">{offender.name}</TableCell>
                    <TableCell>{offender.offenseType}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(offender.registrationStatus)}
                      >
                        {offender.registrationStatus.charAt(0).toUpperCase() + offender.registrationStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{offender.lastKnownAddress}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={onOpenAuthModal}
                      >
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
  );
};

export default SearchResultsSection;
