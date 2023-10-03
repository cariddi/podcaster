import { AxiosResponse } from 'axios';
import {
	DomainPodcastSnapshot,
	PodcastsResponse,
	RawPodcastsResponse,
} from '../types';

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
