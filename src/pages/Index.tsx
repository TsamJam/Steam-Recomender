import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { PersonaCard } from "@/components/PersonaCard";
import { Search, User, Gamepad2, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Base URL API kamu
const API_URL = import.meta.env.VITE_API_URL;

const Index = () => {
  const [mode, setMode] = useState<"user" | "game">("user");
  const [inputValue, setInputValue] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [persona, setPersona] = useState<any>(null); // State untuk data persona
  const [loading, setLoading] = useState(false);
  
  // State khusus untuk search suggestion
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle Search Input Change (untuk mode Game)
  const handleGameSearch = async (val: string) => {
    setInputValue(val);
    
    // Logic Autocomplete diaktifkan kembali
    if (mode === "game" && val.length > 2) {
      try {
        const res = await fetch(`${API_URL}/search_games?query=${val}`);
        const data = await res.json();
        setSuggestions(data.results || []);
        setShowSuggestions(true);
      } catch (e) {
        console.error("Gagal search suggestion", e);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const fetchRecommendations = async () => {
    if (!inputValue) return;
    setLoading(true);
    setRecommendations([]);
    setPersona(null); // Reset persona saat pencarian baru
    setShowSuggestions(false); // Sembunyikan suggestion saat tombol cari ditekan
    
    try {
      let endpoint = "";
      if (mode === "user") {
        endpoint = `${API_URL}/recommend_by_steam_id?steam_id=${inputValue}`;
        
        // --- FETCH PERSONA (UPDATED) ---
        // Menggunakan endpoint baru /user_profile/{steam_id}
        fetch(`${API_URL}/user_profile/${inputValue}`)
          .then((res) => res.json())
          .then((data) => {
            // Backend mengembalikan struktur { status: "success", data: {...} }
            if (data.status === "success" && data.data) {
              setPersona(data.data);
            }
          })
          .catch((err) => console.error("Gagal load persona:", err));
        // -------------------------------

      } else {
        // Endpoint rekomendasi by game name
        endpoint = `${API_URL}/recommend_by_game_name?game_name=${encodeURIComponent(inputValue)}`;
      }

      // Fetch Rekomendasi Utama (Game Cards)
      const res = await fetch(endpoint);
      const data = await res.json();

      if (!res.ok) { // Cek status HTTP error (404/500)
         throw new Error(data.detail || "Gagal mengambil data");
      }

      setRecommendations(data.recommendations || []);
      
      if (data.recommendations?.length > 0) {
        toast.success(`Ditemukan ${data.recommendations.length} rekomendasi!`);
      } else {
        toast.warning("Tidak ada rekomendasi ditemukan.");
      }

    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Terjadi kesalahan koneksi ke backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1017] text-white font-sans selection:bg-[#66c0f4] selection:text-white">
      
      {/* HERO SECTION */}
      <div className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1b2838] via-[#0a1017] to-[#0a1017] z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Steam Recommendation
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            Temukan game favoritmu berikutnya
          </p>

          {/* SEARCH BOX CONTAINER */}
          <div className="bg-[#16202d]/80 backdrop-blur-xl border border-[#2a475e] p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 relative">
            
            {/* TOGGLE MODE */}
            <div className="flex bg-[#0a1017] rounded-xl p-1 gap-1 w-full md:w-auto shrink-0">
              <button 
                onClick={() => { setMode("user"); setInputValue(""); setRecommendations([]); setPersona(null); }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === "user" ? "bg-[#2a475e] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
              >
                <User size={16} /> User ID
              </button>
              <button 
                onClick={() => { setMode("game"); setInputValue(""); setRecommendations([]); setPersona(null); }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === "game" ? "bg-[#2a475e] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
              >
                <Gamepad2 size={16} /> Game Name
              </button>
            </div>

            {/* INPUT FIELD */}
            <div className="relative flex-1 w-full">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => handleGameSearch(e.target.value)}
                placeholder={mode === "user" ? "Contoh: 76561198998178100" : "Contoh: Elden Ring"}
                className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-gray-600 font-medium"
                onKeyDown={(e) => e.key === "Enter" && fetchRecommendations()}
              />
              
              {/* SUGGESTIONS DROPDOWN */}
              {showSuggestions && suggestions.length > 0 && mode === "game" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b2838] border border-[#2a475e] rounded-xl shadow-2xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setInputValue(s); setShowSuggestions(false); }}
                      className="px-4 py-3 hover:bg-[#2a475e] cursor-pointer text-sm text-gray-300 hover:text-white transition-colors border-b border-[#2a475e]/30 last:border-0"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={fetchRecommendations}
              disabled={loading}
              className="bg-[#66c0f4] hover:bg-[#4192c0] text-[#0a1017] px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 w-full md:w-auto justify-center shadow-[0_0_20px_rgba(102,192,244,0.3)] hover:shadow-[0_0_30px_rgba(102,192,244,0.5)]"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              <span className="md:hidden">Cari</span>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            {mode === "user" && (
                <a href="https://store.steampowered.com/account/" target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-[#66c0f4] underline transition-colors">
                  Dimana melihat Steam ID saya?
                </a>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="container mx-auto px-4 pb-20 max-w-7xl">
        
        {/* TAMPILKAN PERSONA CARD (JIKA ADA DATA) */}
        {persona && (
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[#2a475e] to-transparent flex-1"></div>
              <h2 className="text-xl font-bold text-[#66c0f4] uppercase tracking-widest">User Analysis</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#2a475e] to-transparent flex-1"></div>
            </div>
            {/* Render Komponen PersonaCard */}
            <PersonaCard data={persona} />
          </div>
        )}

        {/* RESULTS GRID */}
        {recommendations.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100">
             <div className="flex items-center justify-between mb-8 border-b border-[#2a475e] pb-4">
               <div>
                 <h2 className="text-3xl font-bold text-white mb-1">
                    {mode === "user" ? "Rekomendasi Personal" : "Game Serupa"}
                 </h2>
                 <p className="text-gray-400 text-sm">
                    {mode === "user" ? "Berdasarkan pola bermain dan genre favoritmu." : `Berdasarkan kemiripan dengan "${inputValue}"`}
                 </p>
               </div>
               <div className="bg-[#16202d] px-4 py-1 rounded-full border border-[#2a475e] text-xs text-[#66c0f4] font-mono">
                 {recommendations.length} Results
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendations.map((game, idx) => (
                  <GameCard key={idx} game={game} />
                ))}
             </div>
          </div>
        )}
        
        {/* EMPTY STATE */}
        {!loading && recommendations.length === 0 && !persona && (
          <div className="text-center py-20 opacity-50">
            <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-500">Mulai pencarian untuk melihat hasil.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;