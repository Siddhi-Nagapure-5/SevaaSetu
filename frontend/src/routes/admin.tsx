import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShieldAlert, Activity, CheckCircle2, XCircle, FileText } from "lucide-react";
import { toast } from "sonner";

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

const mockMatches = [
  { id: 1, need: "200 winter blankets for shelter", receiver: "Aasha Foundation", donorItem: "150 gently used blankets", donor: "Rahul Sharma", matchScore: "85%" },
  { id: 2, need: "Daily meals for 50 children", receiver: "City Orphanage", donorItem: "Catering for 50 people", donor: "TCS Corporate", matchScore: "100%" },
];

function AdminDashboard() {
  const handleApproveKYC = (name: string) => {
    toast.success("KYC Approved", {
      description: `${name} has been verified and can now post needs on the platform.`,
    });
  };

  const handleRejectKYC = (name: string) => {
    toast.error("KYC Rejected", {
      description: `${name}'s application was rejected. They have been notified.`,
    });
  };

  const handleApprovePost = (title: string) => {
    toast.success("Post Approved", {
      description: `"${title}" is now live on the public needs board.`,
    });
  };

  const handleApproveMatch = (id: number) => {
    toast.success("Match Approved!", {
      description: `Both the donor and the receiver have been notified of the successful match.`,
    });
  };

  const handleExport = (type: string) => {
    toast.success("Export Started", {
      description: `Your ${type} file is being generated and will download shortly.`,
    });
  };

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
          <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-6">
            <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
            <TabsTrigger value="moderation">Needs Moderation</TabsTrigger>
            <TabsTrigger value="matches">Suggested Matches</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                    <Button 
                      onClick={() => handleApproveKYC(org.name)}
                      variant="default" 
                      size="sm" 
                      className="bg-sage hover:bg-sage/90 text-sage-foreground"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                    </Button>
                    <Button 
                      onClick={() => handleRejectKYC(org.name)}
                      variant="destructive" 
                      size="sm"
                    >
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
                    <Button 
                      onClick={() => handleApprovePost(need.title)}
                      variant="outline" 
                      size="sm"
                    >
                      Approve Post
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Suggested Matches for Review</h2>
            {mockMatches.map((match) => (
              <Card key={match.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Need (Receiver)</div>
                      <div className="font-semibold">{match.need}</div>
                      <div className="text-sm text-muted-foreground">by {match.receiver}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Pledge (Donor)</div>
                      <div className="font-semibold">{match.donorItem}</div>
                      <div className="text-sm text-muted-foreground">by {match.donor}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 border-l pl-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">Match Score</div>
                      <div className="text-2xl font-bold text-sage">{match.matchScore}</div>
                    </div>
                    <Button onClick={() => handleApproveMatch(match.id)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Approve Match
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Export Data & Reports</h2>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Donation Records & Transaction History</h3>
              <p className="text-muted-foreground text-sm mb-6">Extract the full transaction history or matched donations into your preferred format for auditing and offline records.</p>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => handleExport('Excel')} variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Export to Excel
                </Button>
                <Button onClick={() => handleExport('PDF')} variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Export to PDF
                </Button>
                <Button onClick={() => handleExport('Email')} variant="secondary" className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Email to Admins
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
