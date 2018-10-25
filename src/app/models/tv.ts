
export interface TvShow {
    title: string;
    seasons: Season[];
    synopsis: string;
    posterLocation: string;
}

export interface Season {
    episodes: Episode[];
    seasonNumber: string;
}

export interface Episode {
    name: string;
    location: string;
}
