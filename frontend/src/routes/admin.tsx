import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShieldAlert, Activity, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

const mockOrgs = [
  { id: 1, name: "Aasha Foundation", regNo: "REG-12345", status: "Pending KYC", date: "2026-05-17" },
  { id: 2, name: "City Orphanage", regNo: "REG-98765", status: "Verified", date: "2026-05-10" },
];

const mockNeeds = [
  { id: 1, org: "Aasha Foundation", title: "200 winter blankets for shelter", status: "Pending Approval" },
  { id: 2, org: "City Orphanage", title: "Daily meals for 50 children", status: "Approved" },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/20">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
            <p className="text-muted-foreground">Manage users, verify organizations, and moderate needs.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+120 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">Organizations awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Platform Activity</CardTitle>
              <Activity className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Needs matched this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="kyc" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
            <TabsTrigger value="moderation">Needs Moderation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kyc" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Organization KYC Requests</h2>
            {mockOrgs.map((org) => (
              <Card key={org.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-lg">{org.name}</span>
                    <Badge variant={org.status === "Verified" ? "default" : "outline"}>
                      {org.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Reg No: {org.regNo} · Applied on {org.date}
                  </div>
                </div>
                {org.status === "Pending KYC" && (
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="bg-sage hover:bg-sage/90 text-sage-foreground">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="moderation" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Content Moderation Queue</h2>
            {mockNeeds.map((need) => (
              <Card key={need.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-lg">{need.title}</span>
                    <Badge variant={need.status === "Approved" ? "default" : "secondary"}>
                      {need.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Posted by: {need.org}
                  </div>
                </div>
                {need.status === "Pending Approval" && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Approve Post</Button>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
