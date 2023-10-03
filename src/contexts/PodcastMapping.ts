import { AxiosResponse } from 'axios';
import {
	DomainEpisodesResponse,
	DomainPodcastSnapshot,
	PodcastDetailsResponse,
	PodcastsResponse,
	RawPodcastsDetailsResponse,
	RawPodcastsResponse,
} from '../types';
import { convertMsToMinutesSeconds } from '../utils';

const getParsedPodcastId = (podcastId: string) =>
	podcastId.substring(
		podcastId.lastIndexOf('id') + 2,
		podcastId.lastIndexOf('?')
	);

export const rawPodcastsToDomain = (
	rawPodcasts: AxiosResponse<RawPodcastsResponse, any>
): DomainPodcastSnapshot[] => {
	const parsed: PodcastsResponse = JSON.parse(rawPodcasts?.data.contents ?? '');

	return parsed.feed.entry.map((podcast) => {
		const domain: DomainPodcastSnapshot = {
			author: podcast['im:artist'].label,
			name: podcast['im:name'].label,
			description: podcast.summary.label,
			icon: podcast['im:image'],
			id: getParsedPodcastId(podcast.id.label),
		};

		return domain;
	});
};

export const rawPodcastEpisodesToDomain = (
	rawPodcastDetails: AxiosResponse<RawPodcastsDetailsResponse, any>
): DomainEpisodesResponse => {
	const parsed: PodcastDetailsResponse = JSON.parse(
		rawPodcastDetails?.data.contents ?? ''
	);

	return {
		episodes: parsed.results.map((episode) => ({
			id: episode.trackId,
			date: new Date(episode.releaseDate).toLocaleDateString(),
			title: episode.trackName,
			duration:
				episode.trackTimeMillis > 0
					? convertMsToMinutesSeconds(episode.trackTimeMillis)
					: '0',
			description: episode.description ?? '',
			src: episode.episodeUrl ?? '',
		})),
		resultCount: parsed.resultCount,
	};
};
