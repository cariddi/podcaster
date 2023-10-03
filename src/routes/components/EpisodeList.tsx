import {
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState';
import { useEpisodesList } from '../../contexts/EpisodesList/EpisodesListContext';
import { Paths } from '../../paths';

const EpisodeList = () => {
	const { podcastId } = useParams();
	const navigate = useNavigate();

	const context = useEpisodesList();
	const { loading, episodesList } = context;

	const onClickTitle = (episodeId: number, podcastId: string) => {
		const selectedEpisode = episodesList?.episodes.find(
			(e) => e.id === episodeId
		);

		navigate(
			`${Paths.EPISODE.replace(':podcastId', podcastId).replace(
				':episodeId',
				episodeId.toString()
			)}`,
			{
				state: {
					currentEpisode: selectedEpisode,
				},
			}
		);
	};

	if (loading || !episodesList || !podcastId)
		return <Spinner size="xl" mt={6} />;

	return (
		<TableContainer
			boxShadow="0px 10px 30px 0px #CCCCCC"
			borderRadius={4}
			w="2xl"
		>
			<Table variant="unstyled">
				<Thead fontSize={14} borderBottom="1px solid #E2E8F0" px={1}>
					<Tr>
						<Th>Title</Th>
						<Th>Date</Th>
						<Th>Duration</Th>
					</Tr>
				</Thead>

				<Tbody fontSize={10}>
					{episodesList.episodes.length > 0 ? (
						episodesList.episodes.slice(1).map((episode, idx) => (
							<Tr bg={idx % 2 === 0 ? 'white' : 'gray.100'} key={episode.id}>
								<Td
									color="blue.600"
									cursor="pointer"
									onClick={() => onClickTitle(episode.id, podcastId)}
								>
									{episode.title}
								</Td>
								<Td>{episode.date}</Td>
								<Td>{episode.duration}</Td>
							</Tr>
						))
					) : (
						<EmptyState displayText="No episodes found" />
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default EpisodeList;
