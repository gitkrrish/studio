import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage application settings and configurations.
        </p>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Features</CardTitle>
            <CardDescription>
              Configure the behavior of AI-powered features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="ai-categorization" className="text-base">Automatic Issue Categorization</Label>
                <p className="text-sm text-muted-foreground">
                  Enable or disable the AI tool that suggests categories for new issues.
                </p>
              </div>
              <Switch id="ai-categorization" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="ai-priority" className="text-base">AI Priority Scoring</Label>
                <p className="text-sm text-muted-foreground">
                  Allow AI to suggest a priority level based on issue description and urgency.
                </p>
              </div>
              <Switch id="ai-priority" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issue Categories</CardTitle>
            <CardDescription>
              Add, remove, or edit the categories available for issue reporting.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* This would be a dynamic list in a real app */}
            <div className="flex items-center gap-2">
                <Input defaultValue="Roads & Highways" />
                <Button variant="destructive" size="sm">Remove</Button>
            </div>
            <div className="flex items-center gap-2">
                <Input defaultValue="Sanitation" />
                <Button variant="destructive" size="sm">Remove</Button>
            </div>
            <Button>Add Category</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
