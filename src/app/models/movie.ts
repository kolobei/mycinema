import { Genre } from "./genre";
import { ProductionCompany } from "./production-company";
import { ProductionCountry } from "./production-country";
import { SpokenLanguage } from "./spoken-language";

export interface Movie {
    adult: boolean;
    backdrop_path?: string;
    id: number;
    original_title: string;
    overview?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    poster_path?: string;
    genres: Genre[];
    homepage: string;
    imdb_id?: string;
    original_language: string;
    popularity: number;
    production_companies: ProductionCompany[];
    revenue: number;
    runtime?: number;
    status: string;
    tagline?: string;
    logo_path?: string;
    origin_country: string;
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}