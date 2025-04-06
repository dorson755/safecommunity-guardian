
import React, { useRef } from "react";
import { Offender } from "@/lib/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface SearchResultsProps {
  searchResults: Offender[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedOffenderId: string | null;
  onViewDetails: (offender: Offender) => void;
  hasSearched: boolean;
  isMobile: boolean;
  rowRefs: React.MutableRefObject<{[id: string]: HTMLTableRowElement | null}>;
  resultsPerPage?: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  currentPage,
  setCurrentPage,
  selectedOffenderId,
  onViewDetails,
  hasSearched,
  isMobile,
  rowRefs,
  resultsPerPage = 15
}) => {
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
  
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
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
              <PaginationNext onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  if (!hasSearched) {
    return (
      <div className="text-center p-12 border rounded-lg">
        <p className="text-muted-foreground">
          Enter a search term above to find registered offenders.
        </p>
      </div>
    );
  }
  
  if (searchResults.length === 0) {
    return (
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
    );
  }
  
  return (
    <>
      <div className="overflow-hidden rounded-lg border shadow-sm animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Offense Type</TableHead>
              {!isMobile && <TableHead>Status</TableHead>}
              {!isMobile && <TableHead>Last Known Address</TableHead>}
              <TableHead className="w-24">Details</TableHead>
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
                <TableCell className="font-medium break-words max-w-[120px]">{offender.name}</TableCell>
                <TableCell className="break-words max-w-[120px]">{offender.offenseType}</TableCell>
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
                {!isMobile && <TableCell className="break-words max-w-[200px]">{offender.lastKnownAddress}</TableCell>}
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewDetails(offender)}
                    className="whitespace-nowrap"
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
  );
};

export default SearchResults;
