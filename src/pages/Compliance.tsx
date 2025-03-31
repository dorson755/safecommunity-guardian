
import React from "react";
import { FileText, Shield, CheckCheck, AlertTriangle, CalendarCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const Compliance = () => {
  const lastAudit = "June 15, 2023";
  const nextAudit = "December 15, 2023";
  
  const complianceFrameworks = [
    {
      name: "GDPR",
      status: "Compliant",
      progress: 100,
      lastAssessed: "May 2023",
      description: "General Data Protection Regulation - European Union data protection and privacy regulation."
    },
    {
      name: "CCPA",
      status: "Compliant",
      progress: 100,
      lastAssessed: "May 2023",
      description: "California Consumer Privacy Act - State statute intended to enhance privacy rights for California residents."
    },
    {
      name: "HIPAA",
      status: "Not Applicable",
      progress: 0,
      lastAssessed: "N/A",
      description: "Health Insurance Portability and Accountability Act - US legislation for data privacy of medical information."
    },
    {
      name: "PCI DSS",
      status: "Compliant",
      progress: 100,
      lastAssessed: "April 2023",
      description: "Payment Card Industry Data Security Standard - Information security standard for handling credit card data."
    },
    {
      name: "SOC 2",
      status: "In Progress",
      progress: 85,
      lastAssessed: "Ongoing",
      description: "Service Organization Control 2 - Reporting framework for managing customer data."
    }
  ];
  
  const dataRetentionPolicies = [
    {
      dataType: "User Account Information",
      retentionPeriod: "Duration of account plus 90 days after deletion",
      purpose: "Account management and authentication"
    },
    {
      dataType: "Search History",
      retentionPeriod: "12 months",
      purpose: "Service improvement and user experience"
    },
    {
      dataType: "Location Data",
      retentionPeriod: "3 months",
      purpose: "Providing location-based alerts and services"
    },
    {
      dataType: "Notification Settings",
      retentionPeriod: "Duration of account",
      purpose: "Delivering alerts and notifications"
    },
    {
      dataType: "Analytics Data",
      retentionPeriod: "36 months (anonymized)",
      purpose: "Product development and improvement"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <FileText size={14} className="mr-1" /> Compliance Information
            </div>
            <h1 className="text-4xl font-bold mb-3">Compliance & Data Governance</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to legal compliance and ethical data management.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Compliance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      Last Security Audit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <CalendarCheck className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{lastAudit}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conducted by independent security firm with expertise in sensitive data systems.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2" />
                      Compliance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-2 bg-green-100 text-green-800 rounded-full py-1 px-3 text-sm font-medium">
                      <CheckCheck className="h-4 w-4 mr-1" />
                      Fully Compliant
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Meeting all applicable regulatory requirements.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarCheck className="h-5 w-5 text-primary mr-2" />
                      Next Scheduled Audit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <CalendarCheck className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{nextAudit}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Regular audits ensure continuous compliance with evolving regulations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Regulatory Compliance</h2>
              <p className="text-muted-foreground mb-6">
                SafeguardRegistry maintains compliance with various privacy and data protection regulations to 
                ensure the security and proper handling of user information.
              </p>
              
              <div className="space-y-6">
                {complianceFrameworks.map((framework, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{framework.name}</span>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          framework.status === "Compliant" 
                            ? "bg-green-100 text-green-800" 
                            : framework.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {framework.status}
                        </span>
                      </CardTitle>
                      <CardDescription>{framework.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {framework.status !== "Not Applicable" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Compliance Progress</span>
                            <span>{framework.progress}%</span>
                          </div>
                          <Progress value={framework.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Last assessed: {framework.lastAssessed}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Data Retention Policies</h2>
              <p className="text-muted-foreground mb-6">
                We retain different types of data for specific periods based on operational needs and legal requirements.
              </p>
              
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data Type</TableHead>
                        <TableHead>Retention Period</TableHead>
                        <TableHead>Purpose</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataRetentionPolicies.map((policy, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{policy.dataType}</TableCell>
                          <TableCell>{policy.retentionPeriod}</TableCell>
                          <TableCell>{policy.purpose}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Special Considerations for Registry Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      Public Registry Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      SafeguardRegistry only displays publicly available registry information that is already 
                      published by government agencies. We do not:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Collect additional information about registered individuals beyond public records</li>
                      <li>Allow users to contribute or modify registry information</li>
                      <li>Provide any non-public or restricted information</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      Use Restrictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our Terms of Service explicitly prohibit misuse of registry information, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Harassment or intimidation of registered individuals</li>
                      <li>Vigilante activities or encouraging violence</li>
                      <li>Commercial use of registry data without authorization</li>
                      <li>Creating derivative databases of registry information</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-6">Compliance Resources</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Documentation & Reports</CardTitle>
                  <CardDescription>
                    Access our compliance documentation and certifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <span>Privacy Impact Assessment</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Updated May 2023</span>
                    </li>
                    <Separator />
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <span>Annual Security Audit Report</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Updated June 2023</span>
                    </li>
                    <Separator />
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <span>Data Protection Policy</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Updated April 2023</span>
                    </li>
                    <Separator />
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <span>Compliance Certificate Bundle</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Updated January 2023</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-8 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SafeguardRegistry. All rights reserved.</p>
          <p className="mt-1">This is a demo application. No real data is used.</p>
        </div>
      </footer>
    </div>
  );
};

export default Compliance;
