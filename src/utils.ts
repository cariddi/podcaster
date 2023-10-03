export const getParsedText = (text: string) =>
	text.length <= 30
		? text.toUpperCase()
		: text.substring(0, 30).toUpperCase() + '...';

export const isExpiredDate = (date: Date): boolean =>
	(new Date().getTime() - date.getTime()) / (1000 * 3600 * 24) > 1;

export const isIncluded = (str: string, term: string): boolean =>
	str.toLowerCase().includes(term.toLowerCase());

export const padTo2Digits = (num: number) => {
	return num.toString().padStart(2, '0');
};

export const convertMsToMinutesSeconds = (milliseconds: number) => {
	const minutes = Math.floor(milliseconds / 60000);
	const seconds = Math.round((milliseconds % 60000) / 1000);

	return seconds === 60
		? `${minutes + 1}:00`
		: `${minutes}:${padTo2Digits(seconds)}`;
};
