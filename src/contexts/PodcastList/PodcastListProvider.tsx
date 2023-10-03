import axios from 'axios';
import { useEffect, useState } from 'react';
import { getTopPodcastsFullUrl } from '../../paths';
import { DomainPodcastSnapshot, RawPodcastsResponse } from '../../types';
import { isExpiredDate, isIncluded } from '../../utils';
import { rawPodcastsToDomain } from '../PodcastMapping';
import { PodcastListContext } from './PodcastListContext';

interface PodcastListProviderProps {
	children: React.ReactNode;
}

export function PodcastListProvider({
	children,
}: PodcastListProviderProps): JSX.Element {
	const [lastRequestedDate, setLastRequestedDate] = useState<
		Date | undefined
	>();

	const [podcasts, setPodcasts] = useState<
		DomainPodcastSnapshot[] | undefined
	>();

	const [filteredPodcasts, setFilteredPodcasts] = useState<
		DomainPodcastSnapshot[] | undefined
	>();

	const [podcastsValid, setPodcastsValid] = useState(true);
	const [podcastsLoading, setPodcastsLoading] = useState(true);

	useEffect(() => {
		if (
			(!podcasts && podcastsValid) ||
			(lastRequestedDate && isExpiredDate(lastRequestedDate))
		) {
			fetchPodcasts();
		}
	});

	const fetchPodcasts = async () => {
		setPodcastsLoading(true);
		try {
			const rawPodcasts = await axios.get<RawPodcastsResponse>(
				getTopPodcastsFullUrl()
			);

			setPodcasts(rawPodcastsToDomain(rawPodcasts));
			setFilteredPodcasts(rawPodcastsToDomain(rawPodcasts));
			setPodcastsValid(true);

			setLastRequestedDate(new Date());
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
		<PodcastListContext.Provider
			value={{
				podcasts: podcasts ?? [],
				filteredPodcasts: filteredPodcasts ?? [],
				updateFilteredPodcasts,
				loading: podcastsLoading,
			}}
		>
			{children}
		</PodcastListContext.Provider>
	);
}
