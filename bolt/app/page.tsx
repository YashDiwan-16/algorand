import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DashboardOverview from '@/components/dashboard/overview';
import RecentActivity from '@/components/dashboard/recent-activity';
import ConsentStats from '@/components/dashboard/consent-stats';
import HeroIllustration from '@/components/illustrations/hero';
import { Shield, Lock, Eye, Clock, Bell, Share2, Smartphone, FileCheck, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              One Consent to Rule Them All
            </h1>
            <p className="text-xl text-muted-foreground">
              Take control of your digital identity. Share your data on your terms with blockchain-powered consent tokens.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <Link href="/create">Create Consent</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary">
                <Link href="/scan">Scan to Consent</Link>
              </Button>
            </div>
            
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-muted-foreground">User Control</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">24/7</p>
                <p className="text-sm text-muted-foreground">Revocation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-muted-foreground">Transparency</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[400px]">
            <HeroIllustration />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose ConsentPass?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of data sharing with our blockchain-powered consent management platform.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group hover-card p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">Your data stays under your control. Grant and revoke access with blockchain-verified consent tokens.</p>
          </div>
          
          <div className="group hover-card p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
            <p className="text-muted-foreground">Track every access to your data in real-time. Know exactly who viewed what and when.</p>
          </div>
          
          <div className="group hover-card p-6 rounded-xl border bg-card">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Time-Bound Access</h3>
            <p className="text-muted-foreground">Set expiration dates for consents. Automatic revocation when time's up.</p>
          </div>
        </div>
      </section>
      
      {/* Integration Section */}
      <section className="py-16 bg-muted/30 -mx-4 px-4 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with your favorite platforms and services for a smooth consent management experience.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div className="p-4 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold">Mobile Ready</h4>
            <p className="text-sm text-muted-foreground">Access anywhere, anytime</p>
          </div>
          
          <div className="p-4 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold">Instant Alerts</h4>
            <p className="text-sm text-muted-foreground">Real-time notifications</p>
          </div>
          
          <div className="p-4 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Share2 className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold">Easy Sharing</h4>
            <p className="text-sm text-muted-foreground">QR code & link sharing</p>
          </div>
          
          <div className="p-4 text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold">Document Verify</h4>
            <p className="text-sm text-muted-foreground">Blockchain verification</p>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perfect For Every Scenario</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From personal documents to business credentials, manage all your consents in one place.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">🏦 Banking & Finance</h4>
            <p className="text-sm text-muted-foreground">Securely share KYC documents and financial records with banks and institutions.</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">🏥 Healthcare</h4>
            <p className="text-sm text-muted-foreground">Control access to your medical records and test reports across healthcare providers.</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">🎓 Education</h4>
            <p className="text-sm text-muted-foreground">Share academic credentials and certificates with universities and employers.</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">🏢 Real Estate</h4>
            <p className="text-sm text-muted-foreground">Manage document sharing for rental agreements and property transactions.</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">💼 Employment</h4>
            <p className="text-sm text-muted-foreground">Share work history and credentials during job applications and verification.</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover-card">
            <h4 className="font-semibold mb-2">⚖️ Legal</h4>
            <p className="text-sm text-muted-foreground">Control access to legal documents and identity verification.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who trust ConsentPass for secure document sharing and consent management.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600">
              <Link href="/create">Get Started Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/consents">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview */}
      <section className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <DashboardOverview />
          <div className="md:col-span-2">
            <ConsentStats />
          </div>
        </div>
      </section>
      
      {/* Recent Activity Preview */}
      <section className="py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Activity</h2>
            <Button variant="ghost" asChild>
              <Link href="/activity">View All</Link>
            </Button>
          </div>
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}