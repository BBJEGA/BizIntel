import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  ArrowLeft,
  Copy,
  CheckCircle2,
  FileText,
  LogOut,
  Home
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { createForm, getFormsByOrgId } from "@/lib/firebase-services";
import { insertFormSchema } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

export default function CreateForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, organization, logout, loading: authLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/login");
    }
  }, [user, authLoading, setLocation]);

  // Fetch forms
  const orgId = organization?.id || user?.uid;
  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["/api/forms", orgId],
    queryFn: async () => {
      if (!orgId) return [];
      return await getFormsByOrgId(orgId);
    },
    enabled: !!orgId,
  });

  // Create form mutation
  const createFormMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Use user.uid if organization is not loaded yet
      const orgId = organization?.id || user?.uid;
      if (!orgId) throw new Error("Not authenticated");
      return await createForm(orgId, data);
    },
    onSuccess: () => {
      const orgId = organization?.id || user?.uid;
      queryClient.invalidateQueries({ queryKey: ["/api/forms", orgId] });
      toast({
        title: "Form created!",
        description: "Your feedback form has been created successfully.",
      });
      setFormData({ title: "", description: "" });
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create form",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = insertFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    createFormMutation.mutate(formData);
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const copyShareableLink = (formId: string) => {
    const link = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(formId);
    toast({
      title: "Link copied!",
      description: "Shareable link copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">BizIntel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3"
              data-testid="nav-dashboard"
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 bg-sidebar-accent"
            data-testid="nav-create-form"
          >
            <FileText className="w-5 h-5" />
            My Forms
          </Button>
        </nav>

        <div className="p-4 border-t">
          <div className="mb-3 px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Organization</p>
            <p className="text-sm font-medium truncate">{organization?.name}</p>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground"
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
          <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">My Forms</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your feedback forms
              </p>
            </div>
            {!showForm && (
              <Button 
                className="gap-2"
                onClick={() => setShowForm(true)}
                data-testid="button-new-form"
              >
                <FileText className="w-5 h-5" />
                New Form
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-8">
          {showForm ? (
            /* Create Form View */
            <Card className="p-8">
              <div className="mb-6">
                <Button
                  variant="ghost"
                  className="gap-2 -ml-2"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ title: "", description: "" });
                    setErrors({});
                  }}
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to forms
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold">Create New Form</h2>
                  <p className="text-muted-foreground mt-2">
                    Design a custom feedback form for your organization
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Form Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g., Customer Satisfaction Survey"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={errors.title ? "border-destructive" : ""}
                      data-testid="input-form-title"
                      required
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Explain the purpose of this feedback form..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`min-h-32 ${errors.description ? "border-destructive" : ""}`}
                      data-testid="input-form-description"
                      required
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={createFormMutation.isPending}
                      data-testid="button-create-form-submit"
                    >
                      {createFormMutation.isPending ? "Creating..." : "Create Form"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ title: "", description: "" });
                        setErrors({});
                      }}
                      data-testid="button-cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          ) : (
            /* Forms List View */
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-6 w-64 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-10 w-32" />
                    </Card>
                  ))}
                </div>
              ) : forms.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No forms yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first feedback form to get started
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    data-testid="button-create-first-form"
                  >
                    Create Form
                  </Button>
                </Card>
              ) : (
                forms.map((form) => (
                  <Card key={form.id} className="p-6 hover-elevate transition-all">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{form.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {form.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          Created {formatDate(form.createdAt)}
                        </span>
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => copyShareableLink(form.id)}
                          data-testid={`button-copy-link-${form.id}`}
                        >
                          {copiedId === form.id ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
