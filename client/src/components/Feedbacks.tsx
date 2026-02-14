import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar } from "lucide-react";
import type { Feedback } from "@shared/schema";

interface FeedbacksProps {
  feedback: Feedback[];
  formatDate: (timestamp: number) => string;
}

export default function Feedbacks({ feedback, formatDate }: FeedbacksProps) {
  if (feedback.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>No feedback submissions found for this organization yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <Card key={item.id} className="p-4 border rounded-lg hover-elevate transition-all">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{item.category}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.message}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Calendar className="w-3 h-3" />
              {formatDate(item.createdAt)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
