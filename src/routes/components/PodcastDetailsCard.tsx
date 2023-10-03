import {
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react';
import { FC } from 'react';

interface PodcastDetailsCardProps {
	src: string;
	name: string;
	author: string;
	description: string;
}

const PodcastDetailsCard: FC<PodcastDetailsCardProps> = ({
	src,
	name,
	author,
	description,
}) => {
	return (
		<Card bg="white" w="xs" minW="xs" boxShadow="0px 10px 30px 0px #CCCCCC">
			<CardBody textAlign="center">
				<Stack divider={<StackDivider />} spacing="4">
					<Box alignSelf="center">
						<Image src={src} boxSize={40} borderRadius={4} />
					</Box>
					<Box>
						<Heading size="xs" fontSize={14}>
							{name}
						</Heading>
						<Text pt="2" fontSize={10} color="gray.500">
							{author}
						</Text>
					</Box>
					<Box>
						<Heading size="xs">Description</Heading>
						<Text pt="2" fontSize={10} fontStyle="italic">
							{description}
						</Text>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default PodcastDetailsCard;
