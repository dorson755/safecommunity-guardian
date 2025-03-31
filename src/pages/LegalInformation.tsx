
import React from "react";
import { Gavel, FileText, Shield, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const LegalInformation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Gavel size={14} className="mr-1" /> Legal Resources
            </div>
            <h1 className="text-4xl font-bold mb-3">Legal Information</h1>
            <p className="text-xl text-muted-foreground">
              Understanding the legal framework behind sex offender registries.
            </p>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Registry Laws</h2>
              <p className="mb-6 text-muted-foreground">
                Sex offender registration and notification systems are governed by federal and state laws that 
                establish requirements for registration.
              </p>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Key Legislation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium">Jacob Wetterling Act (1994)</h3>
                    <p className="text-muted-foreground">
                      Required states to implement a sex offender and crimes against children registry.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Megan's Law (1996)</h3>
                    <p className="text-muted-foreground">
                      Amended the Wetterling Act to require public disclosure of information about registered sex offenders.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Adam Walsh Child Protection and Safety Act (2006)</h3>
                    <p className="text-muted-foreground">
                      Established the Sex Offender Registration and Notification Act (SORNA), 
                      creating comprehensive national standards for sex offender registration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Registration Requirements</h2>
              <p className="mb-6 text-muted-foreground">
                Registration requirements vary by jurisdiction and depend on the offense type and risk level.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Who Must Register</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">Generally, individuals must register if they have been convicted of:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Sexual offenses against children</li>
                      <li>Sexual assault or rape</li>
                      <li>Possession, production, or distribution of child pornography</li>
                      <li>Kidnapping of a minor (except by a parent)</li>
                      <li>Other sexually violent offenses</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Registration Duration</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">The length of time an offender must remain registered depends on their tier classification:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Tier 1 (Low Risk):</strong> 15 years, with potential reduction to 10 years</li>
                      <li><strong>Tier 2 (Medium Risk):</strong> 25 years</li>
                      <li><strong>Tier 3 (High Risk):</strong> Lifetime registration</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Verification Requirements</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">Registered offenders must regularly verify their information:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Tier 1:</strong> Annual verification</li>
                      <li><strong>Tier 2:</strong> Verification every 6 months</li>
                      <li><strong>Tier 3:</strong> Verification every 3 months</li>
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                      Offenders must also report changes in residence, employment, or student status usually 
                      within 3 business days.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Legal Use of Registry Information</h2>
              <p className="mb-6 text-muted-foreground">
                While registry information is public, there are legal restrictions on how it can be used.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-600">
                      <Shield className="mr-2 h-5 w-5" />
                      Permitted Uses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Personal and family safety planning</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Community awareness and education</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-600"></div>
                        <span>Background checks (where legally authorized)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Prohibited Uses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-600"></div>
                        <span>Harassment or intimidation of registered offenders</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-600"></div>
                        <span>Discrimination in housing or employment (in many jurisdictions)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-600"></div>
                        <span>Vigilante justice or threatening behavior</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
          
          <div className="mt-12 p-6 border border-primary/20 rounded-lg bg-primary/5">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Gavel className="mr-2 h-5 w-5 text-primary" />
              Legal Disclaimer
            </h3>
            <p className="text-muted-foreground">
              This information is provided for educational purposes only and does not constitute legal advice. 
              Laws vary by jurisdiction and change over time. Consult with a qualified attorney for specific 
              legal questions regarding sex offender registration requirements.
            </p>
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

export default LegalInformation;
