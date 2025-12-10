import { GameCard } from "./GameCard";

interface Game {
  appid: number;
  name: string;
  header_image?: string;
  price_overview?: {
    final_formatted: string;
  };
  metacritic?: {
    score: number;
  };
  genres?: Array<{ description: string }>;
  short_description?: string;
}

interface GameGridProps {
  games: Game[];
  loading?: boolean;
}

export const GameGrid = ({ games, loading }: GameGridProps) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Mencari game terbaik untuk Anda...</p>
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Rekomendasi Game
        </h2>
        <p className="text-muted-foreground text-lg">
          Ditemukan {games.length} game yang cocok untuk Anda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <div 
            key={game.appid}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <GameCard
              name={game.name}
              image={game.header_image || "/placeholder.svg"}
              price={game.price_overview?.final_formatted}
              rating={game.metacritic?.score ? game.metacritic.score / 10 : undefined}
              tags={game.genres?.map(g => g.description)}
              description={game.short_description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
