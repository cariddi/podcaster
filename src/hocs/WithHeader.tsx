import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../paths';

interface WithHeaderProps {
	children: React.ReactNode;
}

const WithHeader: FC<WithHeaderProps> = ({ children }) => {
	const navigate = useNavigate();

	return (
		<VStack p={10}>
			<HStack w="100%">
				<Text
					alignSelf="start"
					color="blue.500"
					fontWeight={600}
					fontSize="xl"
					cursor="pointer"
					onClick={() => navigate(Paths.HOME)}
				>
					Podcaster
				</Text>
			</HStack>
			<Divider />
			{children}
		</VStack>
	);
};

export default WithHeader;
