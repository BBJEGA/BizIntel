import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { insertFeedbackSchema, type FeedbackCategory } from "@shared/schema";
import { getFormById, createFeedback } from "@/lib/firebase-services";

export default function PublicFeedback() {
  const [, params] = useRoute("/form/:formId");
  const { toast } = useToast();
  const formId = params?.formId || "";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    category: "" as FeedbackCategory,
    anonymous: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch form details
  const { data: form, isLoading: formLoading } = useQuery({
    queryKey: ["/api/forms", formId],
    queryFn: async () => {
      if (!formId) return null;
      return await getFormById(formId);
    },
    enabled: !!formId,
  });

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!form?.id || !form?.orgId) throw new Error("Form not found");
      return await createFeedback(form.id, form.orgId, data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = insertFeedbackSchema.safeParse(formData);
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

    submitFeedbackMutation.mutate(formData);
  };

  if (formLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-2xl p-8 space-y-6">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full" />
        </Card>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-2xl p-12 text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-semibold mb-2">Form Not Found</h2>
          <p className="text-muted-foreground">
            The feedback form you're looking for doesn't exist or has been removed.
          </p>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-2xl p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-chart-4/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-chart-4" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Feedback Submitted!</h2>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for taking the time to share your thoughts with us. 
              Your feedback helps us improve our services.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setFormData({ message: "", category: "" as FeedbackCategory, anonymous: false });
            }}
            data-testid="button-submit-another"
          >
            Submit Another Response
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-2xl p-8 space-y-8">
        {/* Organization Branding */}
        <div className="text-center space-y-3 pb-6 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold text-muted-foreground">
              Feedback Form
            </span>
          </div>
          <h1 className="text-3xl font-semibold">{form.title}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {form.description}
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Feedback Type <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={formData.category}
              onValueChange={(value) => 
                setFormData({ ...formData, category: value as FeedbackCategory })
              }
            >
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover-elevate transition-all">
                <RadioGroupItem 
                  value="Complaint" 
                  id="complaint"
                  data-testid="radio-complaint"
                />
                <Label 
                  htmlFor="complaint" 
                  className="flex-1 cursor-pointer flex items-start gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      Complaint
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Report an issue or problem
                    </p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover-elevate transition-all">
                <RadioGroupItem 
                  value="Compliment" 
                  id="compliment"
                  data-testid="radio-compliment"
                />
                <Label 
                  htmlFor="compliment" 
                  className="flex-1 cursor-pointer flex items-start gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium">
                      <MessageSquare className="w-4 h-4 text-chart-4" />
                      Compliment
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share positive feedback or praise
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Your Feedback <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Please share your feedback in detail..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`min-h-32 ${errors.message ? "border-destructive" : ""}`}
              data-testid="textarea-message"
              required
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message}</p>
            )}
          </div>

          {/* Anonymous Option */}
          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
            <Checkbox
              id="anonymous"
              checked={formData.anonymous}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, anonymous: checked as boolean })
              }
              data-testid="checkbox-anonymous"
            />
            <div className="flex-1">
              <Label 
                htmlFor="anonymous" 
                className="text-sm font-medium cursor-pointer"
              >
                Submit anonymously
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Your identity will not be shared with the organization
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={submitFeedbackMutation.isPending}
            data-testid="button-submit-feedback"
          >
            {submitFeedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
