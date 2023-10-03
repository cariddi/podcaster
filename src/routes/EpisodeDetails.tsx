import { HStack, Spinner, VStack } from '@chakra-ui/react';
import { useCurrentPodcastList } from '../contexts/PodcastList/PodcastListContext';
import { EpisodeCard, PodcastDetailsCard } from './components';

const EpisodeDetails = () => {
	const podcastsContext = useCurrentPodcastList();
	const { currentPodcast } = podcastsContext;

	if (!currentPodcast) return <Spinner size="xl" mt={6} />;

	return (
		<HStack w="100%" justifyContent="space-around" alignItems="start" mt={6}>
			<PodcastDetailsCard
				src={currentPodcast.icon[currentPodcast.icon.length - 1].label}
				name={currentPodcast.name}
				author={currentPodcast.author}
				description={currentPodcast.description}
			/>
			<VStack spacing={4}>
				<EpisodeCard />
			</VStack>
		</HStack>
	);
};

export default EpisodeDetails;
