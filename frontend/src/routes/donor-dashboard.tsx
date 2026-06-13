import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Activity, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/donor-dashboard")({
  component: DonorDashboard,
});

const mockPledges = [
  { id: 1, type: "Items", amount: "50 Blankets", date: "2026-05-15", status: "Matched", match: "Aasha Foundation" },
  { id: 2, type: "Funds", amount: "₹5,000", date: "2026-05-10", status: "Delivered", match: "City Orphanage" },
  { id: 3, type: "Services", amount: "10 hours Tutoring", date: "2026-05-16", status: "Pending", match: null },
];

function DonorDashboard() {
  return (
    <div className="min-h-screen bg-muted/20">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Donor Dashboard</h1>
            <p className="text-muted-foreground">Track your pledges and see your impact.</p>
          </div>
          <Link
            to="/needs"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Find a need to match
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pledges</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Matched & Delivered</CardTitle>
              <Activity className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">75% success rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">People Impacted</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">~150</div>
              <p className="text-xs text-muted-foreground">Estimated based on deliveries</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Recent Pledges</h2>
        <div className="grid gap-4">
          {mockPledges.map((pledge) => (
            <Card key={pledge.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
              <div className="space-y-1 mb-4 sm:mb-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{pledge.amount}</span>
                  <Badge variant={pledge.status === "Pending" ? "outline" : (pledge.status === "Matched" ? "secondary" : "default")}>
                    {pledge.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Pledged on {pledge.date} · Type: {pledge.type}
                </div>
              </div>
              <div className="text-sm sm:text-right flex flex-col items-end gap-2">
                {pledge.match ? (
                  <>
                    <div>
                      <div className="text-muted-foreground">Matched with:</div>
                      <div className="font-medium text-foreground">{pledge.match}</div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View Impact</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Pledge Details</DialogTitle>
                          <DialogDescription>
                            Your pledge of {pledge.amount} was matched with {pledge.match}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/20">
                            <CheckCircle className="h-5 w-5 text-sage" />
                            <div>
                              <p className="font-semibold text-sm">Status: {pledge.status}</p>
                              <p className="text-xs text-muted-foreground">The organization has confirmed receipt.</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">A note from {pledge.match}</h4>
                            <p className="text-sm text-muted-foreground italic">"Thank you so much! Your donation has directly helped us provide for the community this week."</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <div className="h-full flex items-center">
                    <span className="text-muted-foreground italic">Waiting for a match...</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
