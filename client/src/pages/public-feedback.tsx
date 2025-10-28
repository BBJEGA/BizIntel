import { useState } from "react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { insertFeedbackSchema, type FeedbackCategory } from "@shared/schema";

// Mock form data
const mockForm = {
  id: "form1",
  title: "Customer Feedback Survey",
  description: "Help us improve our products and services",
  orgName: "Acme Corporation",
};

export default function PublicFeedback() {
  const [, params] = useRoute("/form/:formId");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    category: "" as FeedbackCategory,
    anonymous: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    setLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
    }, 1000);
  };

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
              {mockForm.orgName}
            </span>
          </div>
          <h1 className="text-3xl font-semibold">{mockForm.title}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {mockForm.description}
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
                  value="Suggestion" 
                  id="suggestion"
                  data-testid="radio-suggestion"
                />
                <Label 
                  htmlFor="suggestion" 
                  className="flex-1 cursor-pointer flex items-start gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-medium">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Suggestion
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share an idea for improvement
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
            disabled={loading}
            data-testid="button-submit-feedback"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
