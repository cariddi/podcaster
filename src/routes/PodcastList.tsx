import { Badge, HStack, Spinner, VStack } from '@chakra-ui/react';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { useCurrentPodcastList } from '../contexts/PodcastList/PodcastListContext';
import PodcastCard from './components/PodcastCard';

const PodcastList = () => {
	const context = useCurrentPodcastList();
	const { loading, filteredPodcasts, updateFilteredPodcasts } = context;

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
