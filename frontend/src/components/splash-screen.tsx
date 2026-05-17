import { useEffect, useState } from "react";
import { HeartHandshake } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    // Completely remove after 2 seconds (0.5s fade out)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center animate-in slide-in-from-bottom-4 fade-in duration-1000">
        <div className="relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-glow mb-6">
          <HeartHandshake className="h-12 w-12 text-primary-foreground animate-pulse" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
          Sevaa<span className="text-primary">Setu</span>
        </h1>
        <p className="mt-2 text-muted-foreground animate-pulse">Bridging Intent with Impact</p>
      </div>
    </div>
  );
}
