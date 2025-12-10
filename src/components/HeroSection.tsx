import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onSearch: (steamId: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [steamId, setSteamId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (steamId.trim()) {
      onSearch(steamId.trim());
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background opacity-50" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-in">
            Steam Game Finder
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Masukkan Steam ID Anda dan temukan rekomendasi game yang sempurna berdasarkan library Anda
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Masukkan Steam ID Anda..."
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                  className="h-14 px-6 bg-card border-2 border-primary/20 focus:border-primary transition-all duration-300 text-lg glow-cyan"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 glow-cyan font-display text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Cari Game
              </Button>
            </div>
          </form>

          <div className="mt-8 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-500">
            <p>Contoh: 76561198012345678 atau nama profil Steam Anda</p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000" />
    </section>
  );
};
