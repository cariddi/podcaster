import { HStack, Spinner, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { EpisodesListProvider } from '../contexts/EpisodesList/EpisodesListProvider';
import { useCurrentPodcastList } from '../contexts/PodcastList/PodcastListContext';
import { EpisodeList, EpisodesBanner, PodcastDetailsCard } from './components';

const PodcastDetails = () => {
	const { podcastId } = useParams();

	const podcastList = useCurrentPodcastList();
	const { currentPodcast } = podcastList;

	if (!currentPodcast) return <Spinner size="xl" mt={6} />;

	return (
		<EpisodesListProvider podcastId={podcastId}>
			<HStack
				w="100%"
				justifyContent="space-between"
				alignItems="start"
				mt={6}
				spacing={6}
			>
				<PodcastDetailsCard
					src={currentPodcast.icon[currentPodcast.icon.length - 1].label}
					name={currentPodcast.name}
					author={currentPodcast.author}
					description={currentPodcast.description}
				/>
				<VStack spacing={4}>
					<EpisodesBanner />
					<EpisodeList />
				</VStack>
			</HStack>
		</EpisodesListProvider>
	);
};

export default PodcastDetails;
