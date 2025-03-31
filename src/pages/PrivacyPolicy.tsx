
import React from "react";
import { Shield, Lock, FileText, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PrivacyPolicy = () => {
  const lastUpdated = "August 15, 2023";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
              <Lock size={14} className="mr-1" /> Privacy
            </div>
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <Separator className="my-8" />
          
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                SafeguardRegistry ("we", "our", or "us") is committed to protecting your privacy. This Privacy 
                Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                sex offender registry service.
              </p>
              <p className="text-muted-foreground">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
                policy, please do not access the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect several types of information from and about users of our service:
              </p>
              
              <div className="ml-6 mb-6">
                <h3 className="text-lg font-medium mb-2">Personal Data</h3>
                <p className="text-muted-foreground mb-3">
                  While using our Service, we may ask you to provide us with certain personally identifiable 
                  information that can be used to contact or identify you, including:
                </p>
                <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code, City</li>
                  <li>Usage Data</li>
                </ul>
              </div>
              
              <div className="ml-6 mb-6">
                <h3 className="text-lg font-medium mb-2">Usage Data</h3>
                <p className="text-muted-foreground">
                  Usage Data may include information such as your device's Internet Protocol address (IP address), 
                  browser type, browser version, pages of our Service that you visit, the time and date of your 
                  visit, the time spent on those pages, and other diagnostic data.
                </p>
              </div>
              
              <div className="ml-6">
                <h3 className="text-lg font-medium mb-2">Location Data</h3>
                <p className="text-muted-foreground">
                  We may use and store information about your location if you give us permission to do so. 
                  We use this data to provide features of our Service and to improve and customize our Service.
                </p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                SafeguardRegistry may use the information we collect for various purposes:
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Provide and maintain our Service</TableCell>
                    <TableCell>Including monitoring the usage of our Service</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Manage your account</TableCell>
                    <TableCell>To manage your registration and access to our Service</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Send notifications</TableCell>
                    <TableCell>Including alerts about registry changes in your area</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Security</TableCell>
                    <TableCell>To detect, prevent and address technical issues and security threats</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Service improvement</TableCell>
                    <TableCell>To analyze usage patterns and improve our features</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We may share your personal information in the following situations:
              </p>
              
              <ul className="list-disc ml-6 space-y-3 text-muted-foreground">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, 
                  contractors or agents who perform services for us or on our behalf.
                </li>
                <li>
                  <strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during 
                  negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.
                </li>
                <li>
                  <strong>Law Enforcement:</strong> Under certain circumstances, we may be required to disclose your personal information 
                  if required to do so by law or in response to valid requests by public authorities.
                </li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                The security of your data is important to us, but no method of transmission over the Internet 
                or method of electronic storage is 100% secure. While we strive to use commercially acceptable 
                means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p className="text-muted-foreground">
                Our security measures include:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>Encryption of data in transit using SSL/TLS protocols</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication procedures</li>
                <li>Regular backups and disaster recovery procedures</li>
                <li>Employee training on data security and privacy practices</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              
              <ul className="list-disc ml-6 space-y-3 text-muted-foreground">
                <li>The right to access information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your data</li>
                <li>The right to restrict or object to processing of your data</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us using the information provided in the 
                "Contact Us" section below.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Service is not directed to anyone under the age of 18. We do not knowingly collect personally 
                identifiable information from anyone under the age of 18. If you are a parent or guardian and you 
                are aware that your child has provided us with personal data, please contact us. If we become aware 
                that we have collected personal data from children without verification of parental consent, we take 
                steps to remove that information from our servers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when 
                they are posted on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li>By email: privacy@safeguardregistry.com</li>
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

export default PrivacyPolicy;
