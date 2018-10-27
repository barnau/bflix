
export interface TvShow {
    _id: string;
    title: string;
    seasons: Season[];
    synopsis: string;
    posterLocation: string;
    horizontalPosterLocation: string;
    genre: string;
}

export interface Season {
    episodes: Episode[];
    seasonNumber: string;
}

export interface Episode {
    name: string;
    location: string;
}
