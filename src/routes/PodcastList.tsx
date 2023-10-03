import { Badge, HStack, Spinner, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EmptyState, SearchBar } from '../components';
import { useCurrentPodcastList } from '../contexts/PodcastList/PodcastListContext';
import { PodcastCard } from './components';

const PodcastList = () => {
	const context = useCurrentPodcastList();
	const {
		loading,
		filteredPodcasts,
		updateFilteredPodcasts,
		setCurrentPodcast,
	} = context;

	const navigate = useNavigate();
	const onClickCard = (podcastId: string): void =>
		navigate(`/podcast/${podcastId}`);

	if (loading) return <Spinner size="xl" mt={16} />;

	return (
		<VStack>
			<HStack w="100%" justifyContent="end" pr={16} pt={4}>
				<Badge
					colorScheme="blue"
					w={16}
					textAlign="center"
					fontSize={16}
					borderRadius={4}
				>
					{filteredPodcasts.length}
				</Badge>
				<SearchBar
					filteredResults={filteredPodcasts}
					updateFilteredResults={updateFilteredPodcasts}
				/>
			</HStack>
			<HStack pt={24} w="100%" flexWrap="wrap" spacing={6}>
				{filteredPodcasts.length > 0 ? (
					filteredPodcasts.map((podcast) => (
						<PodcastCard
							imgSrc={podcast.icon[podcast.icon.length - 1].label}
							name={podcast.name}
							author={podcast.author}
							key={podcast.name}
							onClickCard={() => {
								setCurrentPodcast(podcast);
								onClickCard(podcast.id);
							}}
						/>
					))
				) : (
					<EmptyState displayText="No podcast found" />
				)}
			</HStack>
		</VStack>
	);
};

export default PodcastList;
