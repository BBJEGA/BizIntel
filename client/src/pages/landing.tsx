import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  BarChart3, 
  Share2, 
  Shield, 
  Zap, 
  Users 
} from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import logoImage from "@assets/a-sophisticated-corporate-logo-design-fe_V_8XqCmZREesNjSau6f7ag_W4Px38qDSEC4uspEpAH3Kw-removebg-p_1761683074267.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="BizIntel Enterprise" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-semibold">BizIntel Enterprise</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" data-testid="button-login">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-7xl w-full grid md:grid-cols-[60%_40%] gap-12 items-center py-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Empowering Businesses Through{" "}
                <span className="text-primary">Intelligent Feedback</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Collect, analyze, and act on insights from your customers and employees.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg hover:scale-105 transition-transform"
                  data-testid="button-hero-get-started"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-hero-learn-more"
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ Trusted by 500+ organizations worldwide
            </p>
          </div>

          {/* Right Column - Hero Carousel */}
          <div className="hidden md:block">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Everything You Need for Feedback Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 space-y-4 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Collect Feedback Easily</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create tailored feedback forms in minutes. Share them with customers, 
                employees, or stakeholders via simple shareable links.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 space-y-4 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Get Actionable Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize feedback trends instantly. Track complaints vs suggestions 
                with intuitive charts and comprehensive dashboards.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 space-y-4 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Make Smarter Decisions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use data-driven insights to make informed business decisions. 
                Identify trends, prioritize improvements, and take action quickly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Your Account</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sign up in seconds with just your organization name and email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Build Your Form</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customize your feedback form with titles and descriptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Analyze Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                View analytics, track trends, and make data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Feedback Process?
          </h2>
          <p className="text-xl opacity-90">
            Join hundreds of organizations already using BizIntel to collect and analyze feedback.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-6 text-lg"
                data-testid="button-cta-get-started"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 BizIntel Enterprise – All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
