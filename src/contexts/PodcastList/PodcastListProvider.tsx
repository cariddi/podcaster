import axios from 'axios';
import { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { getTopPodcastsFullUrl } from '../../paths';
import { DomainPodcastSnapshot, RawPodcastsResponse } from '../../types';
import { getExpiresIn, isIncluded } from '../../utils';
import { rawPodcastsToDomain } from '../PodcastMapping';
import { PodcastListContext } from './PodcastListContext';

interface PodcastListProviderProps {
	children: React.ReactNode;
}

export function PodcastListProvider({
	children,
}: PodcastListProviderProps): JSX.Element {
	const [cookies, setCookie] = useCookies(['podcastsReqDate']);

	const [podcasts, setPodcasts] = useState<
		DomainPodcastSnapshot[] | undefined
	>();

	const [currentPodcast, setCurrentPodcast] = useState<
		DomainPodcastSnapshot | undefined
	>();

	const [filteredPodcasts, setFilteredPodcasts] = useState<
		DomainPodcastSnapshot[] | undefined
	>();

	const [podcastsValid, setPodcastsValid] = useState(true);
	const [podcastsLoading, setPodcastsLoading] = useState(true);

	useEffect(() => {
		if (
			(!podcasts && podcastsValid) ||
			cookies['podcastsReqDate'] === undefined // expires after 1 day
		) {
			fetchPodcasts();
		}
	});

	const fetchPodcasts = async () => {
		setPodcastsLoading(true);
		try {
			console.log({ today: new Date(), expiresIn: getExpiresIn() });

			const rawPodcasts = await axios.get<RawPodcastsResponse>(
				getTopPodcastsFullUrl()
			);

			setPodcasts(rawPodcastsToDomain(rawPodcasts));
			setFilteredPodcasts(rawPodcastsToDomain(rawPodcasts));
			setPodcastsValid(true);

			setCookie('podcastsReqDate', new Date(), {
				expires: getExpiresIn(),
			});
		} catch {
			setPodcastsValid(false);
		}
		setPodcastsLoading(false);
	};

	const updateFilteredPodcasts = (term: string): void => {
		if (!podcasts || podcasts.length === 0) return;
		const filteredResults = podcasts.filter(
			({ name, author }) => isIncluded(name, term) || isIncluded(author, term)
		);

		setFilteredPodcasts(filteredResults);
	};

	return (
		<CookiesProvider>
			<PodcastListContext.Provider
				value={{
					podcasts: podcasts ?? [],
					filteredPodcasts: filteredPodcasts ?? [],
					updateFilteredPodcasts,
					loading: podcastsLoading,
					currentPodcast,
					setCurrentPodcast,
				}}
			>
				{children}
			</PodcastListContext.Provider>
		</CookiesProvider>
	);
}
