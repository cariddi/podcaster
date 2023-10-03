import { Center, Code, Text, VStack } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
	const error = useRouteError();
	return (
		<Center h="85vh" w="100%">
			<VStack gap="2">
				<Text color="red">We've encountered an error with your request.</Text>
				<Text>Please contact your client concierge.</Text>
				<Code w="400px" py="10px" textAlign="center" background="gray.300">
					Error: {(error as any)?.message}
				</Code>
			</VStack>
		</Center>
	);
}
