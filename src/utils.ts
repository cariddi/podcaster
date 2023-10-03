export const getParsedText = (text: string) =>
	text.length <= 30
		? text.toUpperCase()
		: text.substring(0, 30).toUpperCase() + '...';

export const isExpiredDate = (date: Date): boolean =>
	(new Date().getTime() - date.getTime()) / (1000 * 3600 * 24) > 1;

export const isIncluded = (str: string, term: string): boolean =>
	str.toLowerCase().includes(term.toLowerCase());
