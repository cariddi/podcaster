import {
	Box,
	ChakraProvider,
	Code,
	Grid,
	Text,
	VStack,
	theme,
} from '@chakra-ui/react';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Box textAlign="center" fontSize="xl">
			<Grid minH="100vh" p={3}>
				<VStack spacing={8}>
					<Text>
						Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
					</Text>
				</VStack>
			</Grid>
		</Box>
	</ChakraProvider>
);
