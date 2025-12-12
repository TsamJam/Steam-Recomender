import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { User, Clock, Gamepad2, Target, Trophy } from "lucide-react"; // Trophy ditambah untuk icon cluster

interface PersonaData {
  steam_id: string;
  username?: string;
  avatar_url?: string;
  total_playtime_hours: number;
  dominant_archetype: string;
  cluster_label?: string; // <--- FIELD BARU: Julukan Cluster (The Specialist, dll)
  dna_breakdown: Record<string, number>;
  games_analyzed: number;
}

interface PersonaCardProps {
  data: PersonaData;
}

export const PersonaCard = ({ data }: PersonaCardProps) => {
  if (!data) return null;

  // Transform data untuk Recharts
  const chartData = Object.entries(data.dna_breakdown).map(([genre, value]) => ({
    subject: genre,
    A: value,
    fullMark: 100,
  }));

  const maxValue = Math.max(...Object.values(data.dna_breakdown));
  const domainMax = maxValue > 0 ? Math.ceil(maxValue) : 100;

  return (
    <div className="w-full bg-[#1b2838] border border-[#2a475e] rounded-md p-6 mb-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700 relative overflow-hidden">
      
      {/* Background Accent (Glow halus di belakang) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#66c0f4]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center relative z-10">
        
        {/* === BAGIAN KIRI (INFO USER) === */}
        <div className="flex-1 text-center md:text-left mb-6 md:mb-0 md:mr-8 w-full">
          <div className="flex flex-col md:flex-row items-center">
            
            {/* AVATAR DENGAN BADGE CLUSTER */}
            <div className="relative shrink-0 mb-4 md:mb-0 mr-0 md:mr-6">
              <div className="relative group">
                {/* Efek Glow Avatar */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#66c0f4] to-[#1b2838] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <img
                  src={data.avatar_url || "/placeholder.svg"}
                  alt="Avatar"
                  className="relative w-28 h-28 rounded-full border-2 border-[#66c0f4] shadow-lg object-cover bg-[#16202d]"
                />
                
                {/* 🔥 BADGE CLUSTER LABEL (BARU) 🔥 */}
                {data.cluster_label && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md border border-orange-400/50 flex items-center gap-1 z-20">
                    <Trophy className="w-3 h-3 text-yellow-200" />
                    {data.cluster_label}
                  </div>
                )}
              </div>
            </div>

            {/* USERNAME & STEAM ID */}
            <div>
              <h2 className="text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-md">
                {data.username || "Unknown Player"}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#66c0f4] text-sm font-mono bg-[#16202d]/50 px-2 py-1 rounded w-fit mx-auto md:mx-0 border border-[#2a475e]/50">
                <User className="w-3 h-3" />
                <span>{data.steam_id}</span>
              </div>
            </div>
          </div>

          {/* GRID STATISTIK */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Playtime */}
            <div className="bg-[#16202d] p-3 rounded border border-[#2a475e] hover:border-[#66c0f4] transition-colors group">
              <div className="flex items-center gap-2 mb-1 text-[#8f98a0] text-xs uppercase font-bold tracking-wider group-hover:text-[#66c0f4]">
                <Clock className="w-3 h-3" />
                <span>Total Playtime</span>
              </div>
              <div className="text-lg font-bold text-white">
                {data.total_playtime_hours} <span className="text-sm text-[#8f98a0]">hours</span>
              </div>
            </div>

            {/* Dominant Archetype */}
            <div className="bg-[#16202d] p-3 rounded border border-[#2a475e] hover:border-[#a3cf06] transition-colors group">
              <div className="flex items-center gap-2 mb-1 text-[#8f98a0] text-xs uppercase font-bold tracking-wider group-hover:text-[#a3cf06]">
                <Target className="w-3 h-3" />
                <span>Main Archetype</span>
              </div>
              <div className="text-lg font-bold text-white">
                {data.dominant_archetype}
              </div>
            </div>

            {/* Games Analyzed */}
            <div className="bg-[#16202d] p-3 rounded border border-[#2a475e] hover:border-[#d63031] transition-colors group col-span-2">
              <div className="flex items-center gap-2 mb-1 text-[#8f98a0] text-xs uppercase font-bold tracking-wider group-hover:text-[#d63031]">
                <Gamepad2 className="w-3 h-3" />
                <span>Library Analyzed</span>
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
              outerRadius="75%" 
              data={chartData}
            >
              <PolarGrid stroke="#2a475e" strokeWidth={1} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: "#8f98a0", fontSize: 11, fontWeight: "bold" }} 
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