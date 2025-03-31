
import React from "react";
import { Gavel, FileText, AlertTriangle, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TermsOfService = () => {
  const lastUpdated = "August 15, 2023";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <FileText size={14} className="mr-1" /> Legal
            </div>
            <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <Separator className="my-8" />
          
          <div className="space-y-4 mb-8">
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-md flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 mb-1">IMPORTANT NOTICE</h3>
                <p className="text-amber-700 text-sm">
                  Please read these Terms of Service carefully before using the SafeguardRegistry platform. 
                  By accessing or using our service, you agree to be bound by these Terms.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using the SafeguardRegistry service, website, and any applications (collectively, 
                the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with 
                any part of the terms, you may not access the Service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                SafeguardRegistry provides a platform for accessing and receiving notifications about publicly 
                available sex offender registry data. Our Service may include features such as:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-4">
                <li>Registry search functionality</li>
                <li>Interactive mapping of registry data</li>
                <li>Notification alerts for specified areas</li>
                <li>Educational resources about community safety</li>
              </ul>
              <p className="text-muted-foreground">
                The content and features of the Service may change from time to time without prior notice.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>3.1 Registration Requirements</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">
                      To access certain features of the Service, you may be required to create an account. 
                      When you register, you agree to provide accurate, current, and complete information.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>3.2 Account Security</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">
                      You are responsible for maintaining the confidentiality of your account credentials and 
                      for all activities that occur under your account. You agree to immediately notify 
                      SafeguardRegistry of any unauthorized use of your account.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>3.3 Account Termination</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">
                      SafeguardRegistry reserves the right to terminate or suspend your account at our sole 
                      discretion, without notice, for conduct that we believe violates these Terms or is 
                      harmful to other users, us, or third parties, or for any other reason.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">
                By using our Service, you agree not to:
              </p>
              
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-4">
                <li>Use registry information to harass, intimidate, or harm registered individuals</li>
                <li>Distribute registry information for purposes of harassment</li>
                <li>Use the Service for any illegal purpose</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use the Service to send spam or unsolicited messages</li>
                <li>Impersonate another person or entity</li>
                <li>Collect or harvest user data without permission</li>
              </ul>
              
              <p className="text-muted-foreground">
                Violation of these policies may result in immediate termination of your account and potential 
                legal action if warranted.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
              <p className="text-muted-foreground mb-4">
                The Service and its original content, features, and functionality are and will remain the 
                exclusive property of SafeguardRegistry and its licensors. The Service is protected by copyright, 
                trademark, and other laws of both the United States and foreign countries.
              </p>
              
              <p className="text-muted-foreground">
                Our trademarks and trade dress may not be used in connection with any product or service without 
                the prior written consent of SafeguardRegistry.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground mb-4">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                SafeguardRegistry expressly disclaims all warranties of any kind, whether express or implied, including 
                but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              
              <p className="text-muted-foreground mb-4">
                SafeguardRegistry makes no warranty that:
              </p>
              
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-4">
                <li>The Service will meet your specific requirements.</li>
                <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
                <li>The results that may be obtained from the use of the Service will be accurate or reliable.</li>
                <li>The quality of any products, services, information, or other material obtained through the Service will meet your expectations.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall SafeguardRegistry, its directors, employees, partners, agents, suppliers, or 
                affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from:
              </p>
              
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-4">
                <li>Your access to or use of or inability to access or use the Service;</li>
                <li>Any conduct or content of any third party on the Service;</li>
                <li>Any content obtained from the Service; and</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless SafeguardRegistry, its parent company, officers, 
                directors, employees, and agents, from and against any and all claims, damages, obligations, losses, 
                liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from:
              </p>
              
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground mt-4">
                <li>Your use of and access to the Service;</li>
                <li>Your violation of any term of these Terms;</li>
                <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right;</li>
                <li>Any claim that your actions caused damage to a third party.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion. By continuing to access 
                or use our Service after revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>By email: legal@safeguardregistry.com</li>
                <li>By phone: (555) 123-4567</li>
                <li>By mail: 123 Safety Street, Suite 405, Seattle, WA 98101</li>
              </ul>
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

export default TermsOfService;
