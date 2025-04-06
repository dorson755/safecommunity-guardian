
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, FileText, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Offender } from "@/lib/types";

interface OffenderDetailsProps {
  offender: Offender;
  onBack: () => void;
}

const OffenderDetails: React.FC<OffenderDetailsProps> = ({ offender, onBack }) => {
  // Function to get the appropriate status color
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
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to search results
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{offender.name}</CardTitle>
              <div className="flex items-center mt-2">
                <Badge 
                  variant="outline" 
                  className={getStatusColor(offender.registrationStatus)}
                >
                  {offender.registrationStatus.charAt(0).toUpperCase() + offender.registrationStatus.slice(1)}
                </Badge>
              </div>
            </div>
            {offender.registrationStatus === "active" && (
              <div className="p-2 bg-red-50 rounded-md flex items-center text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Active offender</span>
              </div>
            )}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-muted-foreground mb-3">Offense Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Offense Type</div>
                  <div className="text-base">{offender.offenseType}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Conviction Date</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date(offender.convictionDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Crime Details</div>
                  <div className="text-base">
                    {offender.crimeDetails || "No detailed information available."}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground mb-3">Location Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Last Known Address</div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <span>{offender.lastKnownAddress}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Coordinates</div>
                  <div className="text-base">
                    {offender.latitude.toFixed(6)}, {offender.longitude.toFixed(6)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Last Updated</div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date(offender.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Safety Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Stay informed about registered offenders in your neighborhood.</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Use the alert system to receive notifications about changes in offender status.</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Report any suspicious activity to local law enforcement.</span>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
              <span>Discuss safety practices with family members, especially children.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffenderDetails;
