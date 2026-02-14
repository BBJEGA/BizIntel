import { Card } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import type { Feedback } from "@shared/schema";

interface LeadsProps {
  feedback: Feedback[];
}

export default function Leads({ feedback }: LeadsProps) {
  const leads = feedback.filter((item) => item.meta?.name || item.meta?.email || item.meta?.location);

  if (leads.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        <UserRound className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>No lead details yet. New submissions with meta fields will appear here.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((item) => (
        <Card key={item.id} className="p-4 border rounded-lg hover-elevate transition-all">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <p><span className="font-medium">Name:</span> {item.meta.name || "N/A"}</p>
            <p><span className="font-medium">Email:</span> {item.meta.email || "N/A"}</p>
            <p><span className="font-medium">Location:</span> {item.meta.location || "N/A"}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
