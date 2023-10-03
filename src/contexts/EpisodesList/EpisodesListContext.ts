import { createContext, useContext } from 'react';
import { DomainEpisodesResponse } from '../../types';

export interface EpisodesListContextType {
	loading: boolean;
	episodesList?: DomainEpisodesResponse | undefined;
}

export const EpisodesList = createContext<EpisodesListContextType>(
	{} as EpisodesListContextType
);

export const useEpisodesList = (): EpisodesListContextType =>
	useContext(EpisodesList);
