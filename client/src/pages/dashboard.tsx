import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  LogOut,
  FileText,
  Home
} from "lucide-react";

// Mock data for initial display
const mockFeedback = [
  {
    id: "1",
    message: "The new dashboard is confusing and hard to navigate...",
    category: "Complaint" as const,
    anonymous: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "2",
    message: "Would love to see dark mode support in the application",
    category: "Suggestion" as const,
    anonymous: true,
    createdAt: Date.now() - 172800000,
  },
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("all");

  const complaints = mockFeedback.filter(f => f.category === "Complaint");
  const suggestions = mockFeedback.filter(f => f.category === "Suggestion");

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">BizIntel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 bg-sidebar-accent"
            data-testid="nav-dashboard"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Button>
          <Link href="/create-form">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3"
              data-testid="nav-create-form"
            >
              <FileText className="w-5 h-5" />
              My Forms
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground"
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
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of your feedback analytics
              </p>
            </div>
            <Link href="/create-form">
              <Button className="gap-2" data-testid="button-create-form">
                <Plus className="w-5 h-5" />
                Create Form
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Feedback */}
            <Card className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Feedback
                </p>
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-bold" data-testid="metric-total">
                  {mockFeedback.length}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-chart-4" />
                  <span className="text-chart-4">+12% from last week</span>
                </p>
              </div>
            </Card>

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
                  {complaints.length > 0 
                    ? `${Math.round((complaints.length / mockFeedback.length) * 100)}% of total` 
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
                  {suggestions.length > 0 
                    ? `${Math.round((suggestions.length / mockFeedback.length) * 100)}% of total` 
                    : "No suggestions yet"}
                </p>
              </div>
            </Card>
          </div>

          {/* Simple Bar Chart */}
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-6">Feedback Distribution</h2>
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
                      width: mockFeedback.length > 0 
                        ? `${(complaints.length / mockFeedback.length) * 100}%` 
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
                      width: mockFeedback.length > 0 
                        ? `${(suggestions.length / mockFeedback.length) * 100}%` 
                        : '0%' 
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Feedback Lists with Tabs */}
          <Card className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Recent Feedback</h2>
                <TabsList>
                  <TabsTrigger value="all" data-testid="tab-all">
                    All ({mockFeedback.length})
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
                {mockFeedback.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No feedback received yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mockFeedback.map((feedback) => (
                      <div 
                        key={feedback.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                        data-testid={`feedback-${feedback.id}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{feedback.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={feedback.category === "Complaint" ? "destructive" : "default"}
                                data-testid={`badge-category-${feedback.id}`}
                              >
                                {feedback.category}
                              </Badge>
                              {feedback.anonymous && (
                                <Badge variant="outline" data-testid={`badge-anonymous-${feedback.id}`}>
                                  Anonymous
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(feedback.createdAt)}
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
                    {complaints.map((feedback) => (
                      <div 
                        key={feedback.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{feedback.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="destructive">
                                {feedback.category}
                              </Badge>
                              {feedback.anonymous && (
                                <Badge variant="outline">Anonymous</Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(feedback.createdAt)}
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
                    {suggestions.map((feedback) => (
                      <div 
                        key={feedback.id}
                        className="p-4 border rounded-lg hover-elevate transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <p className="leading-relaxed">{feedback.message}</p>
                            <div className="flex items-center gap-3">
                              <Badge variant="default">
                                {feedback.category}
                              </Badge>
                              {feedback.anonymous && (
                                <Badge variant="outline">Anonymous</Badge>
                              )}
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(feedback.createdAt)}
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
