import { Link } from "@tanstack/react-router";
import { HeartHandshake, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { useMockAuth } from "@/lib/mock-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/needs", label: "Live Needs" },
  { to: "/post-need", label: "Post a Need" },
  { to: "/donate", label: "Donate" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const { isLoggedIn, role, logout } = useMockAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
            <HeartHandshake className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-foreground">Sevaa<span className="text-primary">Setu</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-1.5 text-sm font-medium text-foreground bg-muted" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 border shadow-sm transition-transform hover:scale-105">
                  <AvatarImage src={role === 'receiver' ? "https://ui-avatars.com/api/?name=Aasha+Foundation&background=87a878&color=fff" : "https://i.pravatar.cc/150?u=a042581f4e29026704d"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {role === 'receiver' ? 'AF' : 'JD'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{role === 'receiver' ? 'Aasha Foundation' : 'John Doe'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{role === 'receiver' ? 'contact@aasha.org' : 'john.doe@example.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/donate"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Give now
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
              <HeartHandshake className="h-4 w-4" strokeWidth={2} />
            </span>
            <span>Sevaa<span className="text-primary">Setu</span></span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            A bridge of service — matching every donation to a real need, in real time.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SevaaSetu · Team-16</p>
      </div>
    </footer>
  );
}
