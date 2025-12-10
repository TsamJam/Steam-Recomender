import { GameAnalytics } from "@/types";
import { ExternalLink, Users, Star, DollarSign } from "lucide-react";

interface GameCardProps {
  game: GameAnalytics;
}

export const GameCard = ({ game }: GameCardProps) => {
  // Helper untuk warna sentiment
  const getSentimentColor = (sentiment: string) => {
    const s = (sentiment || "").toLowerCase();
    if (s.includes("positive")) return "text-[#66c0f4]";
    if (s.includes("mixed")) return "text-[#a89456]";
    if (s.includes("negative")) return "text-[#c94a4a]";
    return "text-gray-400";
  };

  return (
    <div className="group relative bg-[#16202d] rounded-xl overflow-hidden border border-[#2a475e]/50 hover:border-[#66c0f4]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#66c0f4]/10 h-full flex flex-col">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#16202d] to-transparent z-10 opacity-60" />
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80";
          }}
        />
        {/* Score Badge */}
        <div className="absolute top-3 right-3 z-20 bg-black/80 backdrop-blur-md border border-[#66c0f4]/30 px-2 py-1 rounded text-xs font-bold text-[#66c0f4] shadow-lg">
          {(game.similarity_score ?? 0) > 0 ? `Score: ${game.similarity_score}` : "Popular"}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white leading-tight mb-1 line-clamp-1 group-hover:text-[#66c0f4] transition-colors">
            {game.name}
          </h3>
          <p className="text-sm text-gray-500">{game.developers || "Unknown Dev"}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 bg-[#0a1017] p-3 rounded-lg border border-[#2a475e]/30">
          {/* Live Players */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
              Live Players
            </span>
            <div className="flex items-center gap-1.5 text-gray-200">
              <Users className="w-3.5 h-3.5 text-[#66c0f4]" />
              <span className="font-mono text-sm">
                {game.current_players.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Sentiment */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
              Reviews
            </span>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              <span className={`text-sm font-medium truncate ${getSentimentColor(game.review_sentiment)}`}>
                {game.review_sentiment || "N/A"}
              </span>
            </div>
          </div>

          {/* Price (Full Width) */}
          <div className="col-span-2 pt-2 mt-1 border-t border-[#2a475e]/30 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Price
            </span>
            <div className="flex items-center gap-1 text-[#a4d007] font-bold text-sm">
              
              {game.price}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
          {game.description || "Tidak ada deskripsi tersedia."}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {game.genres.map((g, i) => (
            <span
              key={i}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#2a475e]/40 text-[#66c0f4] border border-[#66c0f4]/20"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a
          href={game.store_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#66c0f4]/10 hover:bg-[#66c0f4] text-[#66c0f4] hover:text-[#1b2838] border border-[#66c0f4]/50 py-2.5 rounded-lg transition-all duration-300 font-bold text-sm group/btn"
        >
          View on Steam
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </a>
      </div>
    </div>
  );
};