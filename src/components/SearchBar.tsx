import { Input } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

interface SearchBarProps {
	updateFilteredResults: (term: string) => void;
	filteredResults: any[];
}

export const SearchBar: FC<SearchBarProps> = ({
	updateFilteredResults,
	filteredResults,
}) => {
	const [term, setTerm] = useState('');

	useEffect(() => {
		const search = () => {
			updateFilteredResults(term);
		};

		if (term && !filteredResults.length) {
			search();
		} else {
			const timeoutId = setTimeout(() => {
				search();
			}, 500);

			return () => clearTimeout(timeoutId);
		}
	}, [filteredResults.length, term, updateFilteredResults]);

	return (
		<Input
			type="text"
			placeholder="Filter podcasts..."
			border="1px solid #949494"
			borderRadius={8}
			size="sm"
			w={300}
			value={term}
			onChange={(e) => setTerm(e.target.value)}
		/>
	);
};
