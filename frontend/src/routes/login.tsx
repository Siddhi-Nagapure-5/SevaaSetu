import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeartHandshake, ArrowLeft } from "lucide-react";
import { useMockAuth } from "@/lib/mock-auth";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login } = useMockAuth();
  const router = useRouter();

  const handleLogin = (role: string, path: string) => {
    login(role);
    router.navigate({ to: path });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Visual/Brand */}
      <div className="hidden w-1/2 flex-col justify-between bg-sage p-12 text-sage-foreground lg:flex relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-20" aria-hidden />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-background/20 text-sage-foreground shadow-sm">
              <HeartHandshake className="h-5 w-5" strokeWidth={2} />
            </span>
            <span>SevaaSetu</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Welcome back to the bridge of service.
          </h1>
          <p className="mt-4 text-sage-foreground/80">
            Log in to continue matching your intent with real-world impact. Every connection makes a difference.
          </p>
        </div>

        <div className="relative z-10 text-sm text-sage-foreground/60">
          © {new Date().getFullYear()} SevaaSetu
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
          
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and password to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required className="h-11" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="h-11" />
            </div>

            <Button type="submit" className="w-full h-11 text-base">
              Sign in
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 bg-background" onClick={() => handleLogin('donor', '/dashboard')}>
              Demo: Donor
            </Button>
            <Button variant="outline" className="h-11 bg-background" onClick={() => handleLogin('receiver', '/dashboard')}>
              Demo: Org
            </Button>
            <Button variant="outline" className="h-11 bg-background col-span-2" onClick={() => handleLogin('admin', '/dashboard')}>
              Demo: Admin
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
