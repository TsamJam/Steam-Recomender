import { User, Clock, Trophy } from "lucide-react";

interface PersonaData {
  steam_id: string;
  username?: string;
  avatar_url?: string;
  total_playtime_hours: number;
  cluster_label?: string;
  // Field lain opsional
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
    <div className="w-full bg-[#1b2838] border border-[#2a475e] rounded-lg p-6 mb-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700 relative overflow-hidden">
      
      {/* Background Glow Halus */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#66c0f4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Main Layout: Flex Row dengan Justify Between */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* === BAGIAN KIRI: AVATAR & TEXT INFO === */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full md:w-auto">
          
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#66c0f4] to-[#1b2838] rounded-full blur opacity-30"></div>
            <img
              src={data.avatar_url || "/placeholder.svg"}
              alt="Avatar"
              className="relative w-24 h-24 rounded-full border-2 border-[#66c0f4] shadow-lg object-cover bg-[#16202d]"
            />
          </div>

          {/* Info User */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-md">
              {data.username || "Unknown Player"}
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-3 text-[#8f98a0] text-sm font-mono mb-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{data.steam_id}</span>
              </div>
            </div>

            {/* Total Playtime (Versi Compact) */}
            <div className="inline-flex items-center gap-2 bg-[#16202d] px-3 py-1.5 rounded border border-[#2a475e]/50">
               <Clock className="w-3.5 h-3.5 text-[#66c0f4]" />
               <span className="text-white font-bold">{data.total_playtime_hours.toLocaleString()}</span>
               <span className="text-[#8f98a0] text-xs">Hours Played</span>
            </div>
          </div>
        </div>

        {/* === BAGIAN KANAN: CLUSTER BADGE (THE STRATEGIST, DLL) === */}
        {data.cluster_label && (
          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <span className="text-[#8f98a0] text-[10px] uppercase font-bold tracking-widest mb-2">
              Player Archetype
            </span>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#16202d] to-[#1b2838] border border-orange-500/30 px-5 py-3 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.1)] group hover:border-orange-500/60 transition-colors">
              <div className="p-2 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-full shadow-inner">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="text-center md:text-right">
                {/* Memecah Label jika ada kurung (...) */}
                <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-400">
                  {data.cluster_label.split(" (")[0]}
                </div>
                {/* Menampilkan subtitle genre jika ada */}
                {data.cluster_label.includes("(") && (
                  <div className="text-[10px] text-gray-400 max-w-[150px] leading-tight mt-0.5">
                    {data.cluster_label.split(" (")[1].replace(")", "")}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};