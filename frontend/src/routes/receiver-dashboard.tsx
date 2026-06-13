import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export const Route = createFileRoute("/receiver-dashboard")({
  component: ReceiverDashboard,
});

const mockNeeds = [
  { id: 1, title: "200 winter blankets for shelter", category: "Clothing", status: "Active", matchCount: 0, date: "2026-05-17" },
  { id: 2, title: "Daily meals for 50 children", category: "Food", status: "Partially Matched", matchCount: 2, date: "2026-05-16" },
  { id: 3, title: "Medical supplies kit", category: "Medical", status: "Fulfilled", matchCount: 1, date: "2026-05-10" },
];

function ReceiverDashboard() {
  return (
    <div className="min-h-screen bg-muted/20">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Receiver Dashboard</h1>
            <p className="text-muted-foreground">Manage your organization's needs and view incoming matches.</p>
          </div>
          <Link
            to="/post-need"
            className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            Post a new need
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Needs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Currently broadcasted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
              <Clock className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting your approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Fulfilled</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">Since registration</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Posted Needs</h2>
        <div className="grid gap-4">
          {mockNeeds.map((need) => (
            <Card key={need.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{need.title}</span>
                    <Badge variant={need.status === "Fulfilled" ? "default" : (need.status === "Active" ? "outline" : "secondary")}>
                      {need.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Posted on {need.date} · Category: {need.category}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-right hidden sm:block">
                    <div className="font-medium">{need.matchCount} Matches</div>
                    <div className="text-muted-foreground text-xs">incoming</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{need.title}</DialogTitle>
                        <DialogDescription>
                          Posted on {need.date} · Category: {need.category}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Description</h4>
                          <p className="text-sm text-muted-foreground">This is a detailed description of the need. We require these items as soon as possible to help the local community.</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Incoming Matches</h4>
                          {need.matchCount > 0 ? (
                            <div className="p-3 border rounded-md bg-muted/30 flex items-center justify-between">
                              <span className="text-sm">Donation offered by <b>Donor User</b></span>
                              <Button size="sm" variant="secondary">Accept Match</Button>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No matches yet. The platform is actively searching.</p>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {need.status !== "Fulfilled" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary" size="sm">Mark Fulfilled</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mark as Fulfilled?</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to mark "{need.title}" as completely fulfilled? This will remove it from the active broadcast board.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                          <Button variant="outline">Cancel</Button>
                          <Button variant="secondary">Confirm Fulfillment</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
