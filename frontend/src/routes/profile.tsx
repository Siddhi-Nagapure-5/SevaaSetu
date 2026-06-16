import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, ShieldCheck, Edit3 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.navigate({ to: "/login" });
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <SiteHeader />
      <main className="flex-1 py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold tracking-tight">Profile & Settings</h1>
            <Button variant="outline" size="sm">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>

          {role === 'admin' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardContent className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User&background=1e293b&color=fff" alt="Admin Profile" />
                    <AvatarFallback className="text-2xl font-display bg-slate-800/10 text-slate-800">AU</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <h2 className="text-2xl font-bold">Admin User</h2>
                      <Badge variant="destructive" className="w-fit mx-auto sm:mx-0">Super Admin</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">Managing platform operations, user verification, and ensuring seamless connections.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Mail className="h-4 w-4 text-muted-foreground" /> admin@sevaasetu.org
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" /> Full Access
                      </div>
                      <div className="flex items-center gap-2 text-foreground font-mono">
                        <span className="font-semibold">Last Login:</span> Today, 10:45 AM
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Settings</CardTitle>
                    <CardDescription>Manage your authentication and access.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="a-email">Admin Email</Label>
                      <Input id="a-email" defaultValue="admin@sevaasetu.org" disabled />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                      <div>
                        <div className="font-semibold text-sm">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">Enabled via Authenticator App</div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <Button variant="secondary" className="w-full">Change Password</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Alerts</CardTitle>
                    <CardDescription>Configure notifications for platform activity.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex-1 text-sm">Email alert on new KYC submissions</Label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex-1 text-sm">SMS alert on flagged needs/reports</Label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex-1 text-sm">Daily platform metrics summary</Label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : role === 'donor' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardContent className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Donor Profile" />
                    <AvatarFallback className="text-2xl font-display bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <h2 className="text-2xl font-bold">John Doe</h2>
                      <Badge variant="secondary" className="w-fit mx-auto sm:mx-0">Active Donor</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">Passionate about community welfare and education. Contributing to causes that matter.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Mail className="h-4 w-4 text-muted-foreground" /> john.doe@example.com
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" /> +91 98765 43210
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> Mumbai, Maharashtra
                      </div>
                      <div className="flex items-center gap-2 text-sage">
                        <ShieldCheck className="h-4 w-4" /> Email Verified
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="d-name">Full Name</Label>
                      <Input id="d-name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-bio">Bio (Optional)</Label>
                      <Input id="d-bio" defaultValue="Passionate about community welfare and education." />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Donation Preferences</CardTitle>
                    <CardDescription>Manage how you want to be notified of needs.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex-1">Email Alerts for Medical Needs</Label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex-1">SMS Alerts for Urgent Local Needs</Label>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card>
                <CardContent className="p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-md rounded-lg">
                    <AvatarImage src="https://ui-avatars.com/api/?name=Aasha+Foundation&background=87a878&color=fff&size=150" alt="Org Logo" />
                    <AvatarFallback className="text-2xl font-display rounded-lg bg-sage/20 text-sage">AF</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-2xl font-bold">Aasha Foundation</h2>
                        <ShieldCheck className="h-5 w-5 text-primary" title="KYC Verified" />
                      </div>
                      <Badge variant="default" className="w-fit mx-auto sm:mx-0">Verified NGO</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">Dedicated to providing shelter and education for underprivileged children.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Mail className="h-4 w-4 text-muted-foreground" /> contact@aasha.org
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> Bangalore, Karnataka
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-mono">
                        <span className="font-semibold text-foreground">Reg No:</span> REG-12345-AB
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-mono">
                        <span className="font-semibold text-foreground">Tax ID:</span> 80G-CERT-2026
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Organization Profile</CardTitle>
                    <CardDescription>Public details visible to donors.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="o-name">Organization Name</Label>
                      <Input id="o-name" defaultValue="Aasha Foundation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="o-website">Website URL</Label>
                      <Input id="o-website" defaultValue="https://www.aashafoundation.org" />
                    </div>
                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">KYC & Verification</CardTitle>
                    <CardDescription>Your official documents and status.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-md border flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">Registration Certificate</div>
                        <div className="text-xs text-muted-foreground">Uploaded on Jan 12, 2026</div>
                      </div>
                      <Badge variant="secondary" className="bg-sage/20 text-sage">Verified</Badge>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-md border flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">80G Tax Exemption Form</div>
                        <div className="text-xs text-muted-foreground">Uploaded on Jan 15, 2026</div>
                      </div>
                      <Badge variant="secondary" className="bg-sage/20 text-sage">Verified</Badge>
                    </div>
                    <Button variant="outline" className="w-full">Upload New Document</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
