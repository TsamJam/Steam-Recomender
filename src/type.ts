// Mendefinisikan bentuk data yang dikirim oleh Backend Python
export interface GameAnalytics {
  name: string;
  app_id: number;
  image: string;
  price: string;
  description: string;
  developers: string;
  genres: string[];
  current_players: number;
  review_sentiment: string;
  store_link: string;
  similarity_score?: number;
}

export interface RecommendationResponse {
  status: string;
  input_context: string;
  recommendations: GameAnalytics[];
  message?: string;
}