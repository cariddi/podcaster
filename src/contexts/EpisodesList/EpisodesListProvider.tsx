import axios from 'axios';
import { useEffect, useState } from 'react';
import { getPodcastWithTopEpisodesFullUrl } from '../../paths';
import {
	DomainEpisodesResponse,
	RawPodcastsDetailsResponse,
} from '../../types';
import { useCurrentPodcastList } from '../PodcastList/PodcastListContext';
import { rawPodcastEpisodesToDomain } from '../PodcastMapping';
import { EpisodesList } from './EpisodesListContext';

interface EpisodesListProviderProps {
	children: React.ReactNode;
	podcastId?: string;
}

export function EpisodesListProvider({
	children,
	podcastId,
}: EpisodesListProviderProps): JSX.Element {
	const context = useCurrentPodcastList();
	const { podcasts } = context;

	const [episodes, setEpisodes] = useState<
		DomainEpisodesResponse | undefined
	>();

	const [episodesValid, setEpisodesValid] = useState(true);
	const [episodesLoading, setEpisodesLoading] = useState(true);

	useEffect(() => {
		if (!episodes && episodesValid && podcastId) {
			fetchEpisodes(podcastId);
		}
	});

	const fetchEpisodes = async (podcastId: string) => {
		setEpisodesLoading(true);
		try {
			const rawPodcastDetails = await axios.get<RawPodcastsDetailsResponse>(
				getPodcastWithTopEpisodesFullUrl(podcastId)
			);

			const domainPodcast = podcasts.find(
				(podcast) => podcast.id === podcastId
			);
			const parsedEpisodes = rawPodcastEpisodesToDomain(rawPodcastDetails);

			if (domainPodcast) {
				setEpisodes(parsedEpisodes);
			}

			setEpisodesValid(true);
		} catch {
			setEpisodesValid(false);
		}
		setEpisodesLoading(false);
	};

	return (
		<EpisodesList.Provider
			value={{
				loading: episodesLoading,
				episodesList: episodes,
			}}
		>
			{children}
		</EpisodesList.Provider>
	);
}
