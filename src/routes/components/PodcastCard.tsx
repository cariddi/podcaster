import { Card, CardBody, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { getParsedText } from '../../utils';

interface PodcastCardProps {
	imgSrc: string;
	name: string;
	author: string;
	onClickCard?: () => void;
}

const PodcastCard: FC<PodcastCardProps> = ({
	imgSrc,
	name,
	author,
	onClickCard,
}) => {
	return (
		<Card
			justifyContent="end"
			maxW={60}
			maxH={44}
			borderRadius={4}
			boxShadow="0px 10px 30px 0px #CCCCCC"
			bg="white"
			mb={20}
			onClick={onClickCard}
			cursor="pointer"
		>
			<CardBody textAlign="center" px={10}>
				<HStack w={40} h={40}>
					<Image src={imgSrc} borderRadius="full" />
				</HStack>
				<VStack h={16}>
					<Text fontSize={14}>{getParsedText(name)}</Text>
					<Text fontSize={10} color="gray.500">
						Author: {getParsedText(author)}
					</Text>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default PodcastCard;
