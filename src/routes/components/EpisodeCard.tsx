import {
	Card,
	CardBody,
	HStack,
	Heading,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const EpisodeCard: FC = () => {
	const location = useLocation();
	const {
		state: { currentEpisode },
	} = location;

	if (!currentEpisode) return <Spinner size="xl" mt={6} />;

	const { title, description, src } = currentEpisode;

	return (
		<Card bg="white" w="md" boxShadow="0px 10px 30px 0px #CCCCCC">
			<CardBody textAlign="center">
				<VStack spacing={4}>
					<Heading size="xs" fontSize={14}>
						{title}
					</Heading>
					<Text fontSize={10} fontStyle="italic">
						{description}
					</Text>
					<HStack w="100%" justifyContent="center">
						<audio
							controls
							style={{
								width: '100%',
								height: 40,
							}}
						>
							<source src={src} type="audio/mpeg" />
						</audio>
					</HStack>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default EpisodeCard;
