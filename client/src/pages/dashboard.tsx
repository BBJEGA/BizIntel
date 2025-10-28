import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart3, 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  LogOut,
  FileText,
  Home,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getFeedbackByOrgId } from "@/lib/firebase-services";
import type { Feedback } from "@shared/schema";
import { cn } from "@/lib/utils";
import logoImage from "@assets/a-sophisticated-corporate-logo-design-fe_V_8XqCmZREesNjSau6f7ag_W4Px38qDSEC4uspEpAH3Kw-removebg-p_1761683074267.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, organization, logout, loading: authLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  // Handle Escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  // Fetch feedback data
  const orgId = organization?.id || user?.uid;
  const { data: feedback = [], isLoading } = useQuery({
    queryKey: ["/api/feedback", orgId],
    queryFn: async () => {
      if (!orgId) return [];
      return await getFeedbackByOrgId(orgId);
    },
    enabled: !!orgId,
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const complaints = feedback.filter((f: Feedback) => f.category === "Complaint");
  const suggestions = feedback.filter((f: Feedback) => f.category === "Suggestion");

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={[
          "fixed md:static inset-y-0 left-0 z-50 w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:!translate-x-0"
        ].join(" ")}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="BizIntel Enterprise" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-semibold">BizIntel Enterprise</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              data-testid="button-close-sidebar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 bg-sidebar-accent text-sidebar-accent-foreground"
            data-testid="nav-dashboard"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Button>
          <Link href="/create-form" onClick={() => setSidebarOpen(false)}>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              data-testid="nav-create-form"
            >
              <FileText className="w-5 h-5" />
              My Forms
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="mb-3 px-3 py-2 rounded-lg bg-sidebar-accent/50">
            <p className="text-xs font-medium text-sidebar-foreground/70">Organization</p>
            <p className="text-sm font-semibold truncate text-sidebar-foreground" data-testid="text-org-name">
              {organization?.name || 'Loading...'}
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="border-b bg-background sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                data-testid="button-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-semibold truncate">Dashboard</h1>
                <p className="text-muted-foreground mt-1 hidden sm:block text-sm md:text-base">
                  Overview of your feedback analytics
                </p>
              </div>
            </div>
            <Link href="/create-form">
              <Button className="gap-2 flex-shrink-0" data-testid="button-create-form">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create Form</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
          {/* Metrics Cards */}
          {isLoading ? (
            <div className="space-y-6">
              <Card className="p-6 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-16" />
              </Card>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[1, 2].map((i) => (
                  <Card key={i} className="p-6 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-16" />
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Total Feedback - Full Width */}
              <Card className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Feedback
                  </p>
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-bold" data-testid="metric-total">
                    {feedback.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All responses received
                  </p>
                </div>
              </Card>

              {/* Complaints and Suggestions - Side by Side on Mobile */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Complaints */}
                <Card className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      Complaints
                    </p>
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-destructive" data-testid="metric-complaints">
                      {complaints.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {feedback.length > 0 
                        ? `${Math.round((complaints.length / feedback.length) * 100)}% of total` 
                        : "No complaints yet"}
                    </p>
                  </div>
                </Card>

                {/* Suggestions */}
                <Card className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">
                      Suggestions
                    </p>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-bold text-chart-1" data-testid="metric-suggestions">
                      {suggestions.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {feedback.length > 0 
                        ? `${Math.round((suggestions.length / feedback.length) * 100)}% of total` 
                        : "No suggestions yet"}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Simple Bar Chart */}
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-6">Feedback Distribution</h2>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Complaints Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Complaints</span>
                    <span className="text-muted-foreground">{complaints.length}</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-destructive rounded-lg transition-all duration-500"
                      style={{ 
                        width: feedback.length > 0 
                          ? `${(complaints.length / feedback.length) * 100}%` 
                          : '0%' 
                      }}
                    />
                  </div>
                </div>

                {/* Suggestions Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Suggestions</span>
                    <span className="text-muted-foreground">{suggestions.length}</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-chart-1 rounded-lg transition-all duration-500"
                      style={{ 
                        width: feedback.length > 0 
                          ? `${(suggestions.length / feedback.length) * 100}%` 
                          : '0%' 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Feedback Lists with Tabs */}
          <Card className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Recent Feedback</h2>
                <TabsList>
                  <TabsTrigger value="all" data-testid="tab-all">
                    All ({feedback.length})
                  </TabsTrigger>
                  <TabsTrigger value="complaints" data-testid="tab-complaints">
                    Complaints ({complaints.length})
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" data-testid="tab-suggestions">
                    Suggestions ({suggestions.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : feedback.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No feedback received yet</p>
                    <p className="text-sm mt-2">Create a form and share it to start collecting feedback</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedback.map((item: Feedback) => (
                      <div 
                        key={item.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                        data-testid={`feedback-${item.id}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{item.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={item.category === "Complaint" ? "destructive" : "default"}
                                data-testid={`badge-category-${item.id}`}
                              >
                                {item.category}
                              </Badge>
                              {item.anonymous && (
                                <Badge variant="outline" data-testid={`badge-anonymous-${item.id}`}>
                                  Anonymous
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="complaints" className="space-y-4">
                {complaints.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No complaints received yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {complaints.map((item: Feedback) => (
                      <div 
                        key={item.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{item.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="destructive">
                                {item.category}
                              </Badge>
                              {item.anonymous && (
                                <Badge variant="outline">Anonymous</Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-4">
                {suggestions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No suggestions received yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {suggestions.map((item: Feedback) => (
                      <div 
                        key={item.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{item.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="default">
                                {item.category}
                              </Badge>
                              {item.anonymous && (
                                <Badge variant="outline">Anonymous</Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
