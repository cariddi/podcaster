import { HStack, SkeletonText } from '@chakra-ui/react';
import { useEpisodesList } from '../../contexts/EpisodesList/EpisodesListContext';

const EpisodesBanner = () => {
	const context = useEpisodesList();
	const { loading, episodesList } = context;

	return (
		<HStack
			boxShadow="0px 10px 30px 0px #CCCCCC"
			p={2}
			borderRadius={4}
			w="2xl"
		>
			<SkeletonText isLoaded={!loading} fontWeight={800} w="50vh">
				Episodes: {episodesList?.resultCount}
			</SkeletonText>
			;
		</HStack>
	);
};

export default EpisodesBanner;
