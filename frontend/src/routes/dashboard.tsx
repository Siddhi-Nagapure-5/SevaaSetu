import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRedirect,
});

function DashboardRedirect() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.navigate({ to: "/login" });
      return;
    }

    if (role === "admin") {
      router.navigate({ to: "/admin" });
    } else if (role === "receiver") {
      router.navigate({ to: "/receiver-dashboard" });
    } else {
      router.navigate({ to: "/donor-dashboard" });
    }
  }, [role, isLoggedIn, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
}
