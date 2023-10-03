import { Text, VStack } from '@chakra-ui/react';

interface EmptyStateProps {
	displayText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
	displayText,
}: EmptyStateProps): JSX.Element => {
	return (
		<VStack justifyContent={'center'}>
			<Text
				fontWeight={500}
				color="secondaryDarkGray.800"
				maxW="50em"
				textAlign="center"
				whiteSpace="pre-line"
			>
				{displayText}
			</Text>
		</VStack>
	);
};
