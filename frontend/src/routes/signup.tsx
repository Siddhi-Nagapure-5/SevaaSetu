import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartHandshake, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Visual/Brand */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-30" aria-hidden />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-background/20 text-primary-foreground shadow-sm">
              <HeartHandshake className="h-5 w-5" strokeWidth={2} />
            </span>
            <span>SevaaSetu</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Join a community of givers and doers.
          </h1>
          <p className="mt-4 text-primary-foreground/90">
            Whether you want to donate or are seeking support for your community, you are in the right place. Set up your account in minutes.
          </p>
        </div>

        <div className="relative z-10 text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} SevaaSetu
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 sm:px-16 lg:w-1/2 xl:px-32 h-screen overflow-y-auto">
        <div className="mx-auto w-full max-w-sm my-auto">
          <Link to="/" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight">Create an account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose how you want to participate in SevaaSetu.
            </p>
          </div>

          <Tabs defaultValue="donor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="donor" className="text-sm">I want to give</TabsTrigger>
              <TabsTrigger value="receiver" className="text-sm">I need support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donor" className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" required className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-email">Email</Label>
                <Input id="donor-email" type="email" placeholder="john@example.com" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-password">Password</Label>
                <Input id="donor-password" type="password" required className="h-11" />
              </div>
              <Button className="w-full h-11 text-base mt-2" asChild>
                <Link to="/login">Create Donor Account</Link>
              </Button>
            </TabsContent>
            
            <TabsContent value="receiver" className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Aasha Foundation" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Official Email</Label>
                <Input id="org-email" type="email" placeholder="contact@aasha.org" required className="h-11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-type">Registration Type</Label>
                  <Input id="reg-type" placeholder="NGO/Trust" required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-number">KYC Reg Number</Label>
                  <Input id="reg-number" placeholder="REG-12345" required className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-password">Password</Label>
                <Input id="org-password" type="password" required className="h-11" />
              </div>
              <Button className="w-full h-11 text-base mt-2" asChild>
                <Link to="/login">Create Receiver Account</Link>
              </Button>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
