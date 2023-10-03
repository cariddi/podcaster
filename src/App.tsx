import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { PodcastListProvider } from './contexts/PodcastList/PodcastListProvider';
import WithHeader from './hocs/WithHeader';
import theme from './theme';

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<PodcastListProvider>
				<WithHeader>
					<Outlet />
				</WithHeader>
			</PodcastListProvider>
		</ChakraProvider>
	);
};
