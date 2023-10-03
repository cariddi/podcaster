import { createContext, useContext } from 'react';
import { DomainPodcastSnapshot } from '../../types';

export interface PodcastListContextType {
	podcasts: DomainPodcastSnapshot[];
	filteredPodcasts: DomainPodcastSnapshot[];
	updateFilteredPodcasts: (term: string) => void;
	loading: boolean;
	currentPodcast: DomainPodcastSnapshot | undefined;
	setCurrentPodcast: React.Dispatch<
		React.SetStateAction<DomainPodcastSnapshot | undefined>
	>;
}

export const PodcastListContext = createContext<PodcastListContextType>(
	{} as PodcastListContextType
);

export const useCurrentPodcastList = (): PodcastListContextType =>
	useContext(PodcastListContext);
