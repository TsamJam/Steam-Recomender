import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { User, Clock, Gamepad2, Target } from "lucide-react"; // Sparkles dihapus

interface PersonaData {
  steam_id: string;
  username?: string;
  avatar_url?: string;
  total_playtime_hours: number;
  dominant_archetype: string;
  dna_breakdown: Record<string, number>;
  games_analyzed: number;
}

interface PersonaCardProps {
  data: PersonaData;
}

export const PersonaCard = ({ data }: PersonaCardProps) => {
  if (!data) return null;

  const chartData = Object.entries(data.dna_breakdown).map(([genre, value]) => ({
    subject: genre,
    A: value,
    fullMark: 100,
  }));

  const maxValue = Math.max(...Object.values(data.dna_breakdown));
  const domainMax = maxValue > 0 ? Math.ceil(maxValue) : 100;

  return (
    // --- PERUBAHAN DI CONTAINER UTAMA ---
    // 1. rounded-xl -> rounded-md (Lebih kotak)
    // 2. bg-[#16202d] -> bg-[#1b2838] (Warna header Steam yang lebih gelap)
    // 3. Menambahkan border-t-4 border-t-[#66c0f4] (Aksen garis biru di atas ala Steam)
    // 4. Shadow diubah jadi lebih subtle/flat
    <div className="bg-[#1b2838] border-x border-b border-[#0a1017] border-t-4 border-t-[#66c0f4] p-6 rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative overflow-hidden mb-8 animate-in fade-in slide-in-from-top-4">
      
      {/* Dekorasi Sparkles DIHAPUS agar lebih bersih ala Steam client */}

      <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
        
        {/* === BAGIAN KIRI === */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center gap-4">
            
            {/* --- PERUBAHAN DI AVATAR --- */}
            <div className="relative shrink-0">
                {/* 1. rounded-full -> rounded-md (Jadi kotak) */}
                {/* 2. Border dipertegas */}
                <div className="w-20 h-20 rounded-md border-2 border-[#66c0f4] overflow-hidden bg-[#0a1017] flex items-center justify-center shadow-sm">
                  {data.avatar_url ? (
                    <img 
                      src={data.avatar_url} 
                      alt="Steam Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-[#66c0f4]" />
                  )}
                </div>
            </div>

            <div>
              <h3 className="text-[#8f98a0] text-xs font-bold uppercase tracking-widest mb-1">
                Steam Profile Analysis
              </h3>
              
              {/* Username lebih menonjol */}
              {data.username ? (
                 <h2 className="text-2xl font-bold text-white mb-2 truncate">{data.username}</h2>
              ) : (
                 <h2 className="text-xl font-bold text-gray-400 mb-2">Unknown User</h2>
              )}

              {/* Badge Style: Lebih solid */}
              <div className="inline-flex items-center px-3 py-1 rounded-sm text-sm font-medium bg-[#2a475e] text-white border border-[#4b6b84]">
                <Target size={14} className="mr-2 text-[#66c0f4]"/>
                {data.dominant_archetype}
              </div>
            </div>
          </div>

          {/* Grid Statistik Kecil */}
          <div className="grid grid-cols-2 gap-3 mt-4 bg-[#121923] p-4 rounded-md border border-[#0a1017] inset-shadow-sm">
            <div className="p-2">
              <div className="flex items-center gap-2 text-[#8f98a0] mb-1">
                <Clock size={14} />
                <span className="text-[10px] font-bold uppercase">Total Playtime</span>
              </div>
              <div className="text-lg font-bold text-[#66c0f4]">
                {data.total_playtime_hours.toLocaleString()} <span className="text-sm text-[#8f98a0]">hours</span>
              </div>
            </div>

            <div className="p-2 border-l border-[#2a475e]/30">
              <div className="flex items-center gap-2 text-[#8f98a0] mb-1">
                <Gamepad2 size={14} />
                <span className="text-[10px] font-bold uppercase">Games Analyzed</span>
              </div>
              <div className="text-lg font-bold text-white">
                {data.games_analyzed} <span className="text-sm text-[#8f98a0]">titles</span>
              </div>
            </div>
          </div>
        </div>

        {/* === BAGIAN KANAN (CHART) === */}
        <div className="flex-1 w-full h-[300px] relative flex items-center justify-center bg-[#121923]/50 rounded-md p-2 border border-[#0a1017]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="80%" 
              data={chartData}
            >
              {/* Grid warna lebih gelap dan tegas */}
              <PolarGrid stroke="#2a475e" strokeWidth={1} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: "#8f98a0", fontSize: 12, fontWeight: "bold" }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, domainMax]} 
                tick={false} 
                axisLine={false} 
              />
              <Radar
                name="Genre Match"
                dataKey="A"
                stroke="#66c0f4"
                strokeWidth={2}
                fill="#66c0f4"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};