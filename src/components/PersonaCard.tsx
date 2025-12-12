import { User, Clock, Trophy } from "lucide-react";

interface PersonaData {
  steam_id: string;
  username?: string;
  avatar_url?: string;
  total_playtime_hours: number;
  cluster_label?: string; // Fokus ke sini
  // Field lain tetap didefinisikan agar tidak error TypeScript, tapi tidak dipakai
  dominant_archetype?: string;
  dna_breakdown?: any;
  games_analyzed?: number;
}

interface PersonaCardProps {
  data: PersonaData;
}

export const PersonaCard = ({ data }: PersonaCardProps) => {
  if (!data) return null;

  return (
    <div className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg p-6 mb-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* Background Glow Halus */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#66c0f4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8">
        
        {/* === 1. AVATAR & CLUSTER BADGE === */}
        <div className="relative shrink-0">
          <div className="relative group">
            {/* Glow di belakang avatar */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#66c0f4] to-[#1b2838] rounded-full blur opacity-30"></div>
            
            <img
              src={data.avatar_url || "/placeholder.svg"}
              alt="Avatar"
              className="relative w-24 h-24 rounded-full border-2 border-[#66c0f4] shadow-lg object-cover bg-[#16202d]"
            />
            
            {/* BADGE CLUSTER (JULUKAN) */}
            {data.cluster_label && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-[11px] uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md border border-orange-400/50 flex items-center gap-1 z-20">
                <Trophy className="w-3 h-3 text-yellow-200" />
                {data.cluster_label}
              </div>
            )}
          </div>
        </div>

        {/* === 2. INFO USER (ID & PLAYTIME) === */}
        <div className="flex-1 text-center sm:text-left">
          
          {/* Username */}
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-md">
            {data.username || "Unknown Player"}
          </h2>

          {/* Steam ID */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[#8f98a0] text-sm font-mono mb-4">
            <User className="w-3 h-3" />
            <span>ID: {data.steam_id}</span>
          </div>

          {/* Total Playtime (Highlight Besar) */}
          <div className="inline-flex items-center gap-3 bg-[#16202d] px-4 py-2 rounded-md border border-[#2a475e] group hover:border-[#66c0f4] transition-colors">
            <div className="p-1.5 bg-[#2a475e] rounded-full group-hover:bg-[#66c0f4] transition-colors">
              <Clock className="w-4 h-4 text-[#66c0f4] group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-[#8f98a0] tracking-wider leading-none mb-0.5">
                Total Playtime
              </p>
              <p className="text-xl font-bold text-white leading-none">
                {data.total_playtime_hours.toLocaleString()} <span className="text-xs font-normal text-[#8f98a0]">Hours</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};