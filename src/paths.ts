export const Paths = {
	HOME: '/',
	PODCAST: '/podcast/:podcastId',
	EPISODE: '/podcast/:podcastId/episode/:episodeId',
};

export const BASE_URL = 'http://api.allorigins.win/get?url=';
export const PODCASTER_URL = 'https://itunes.apple.com/us/rss/toppodcasts';
export const PODCAST_DETAILS_URL = 'https://itunes.apple.com/lookup';

export const BASE_PODCASTS_LIMIT = 100;
export const BASE_GENRE = 1310;
export const BASE_EPISODE_LIMIT = 20;

export const getTopPodcastsBaseUrl = (limit: number, genre: number) =>
	`${PODCASTER_URL}/limit=${limit}/genre=${genre}/json`;

export const getTopPodcastsFullUrl = () =>
	`${BASE_URL}${encodeURIComponent(
		getTopPodcastsBaseUrl(BASE_PODCASTS_LIMIT, BASE_GENRE)
	)}`;

export const getPodcastDetailsBaseUrl = (podcastId: string, limit: number) =>
	`${PODCAST_DETAILS_URL}?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=${limit}`;

export const getPodcastWithTopEpisodesFullUrl = (podcastId: string) =>
	`${BASE_URL}${encodeURIComponent(
		getPodcastDetailsBaseUrl(podcastId, BASE_EPISODE_LIMIT)
	)}`;
