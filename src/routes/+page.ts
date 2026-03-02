import {
	profile,
	education,
	experience,
	service,
	news,
	publications,
	presentations,
	software,
	teaching,
} from "$lib/data";

export const load = () => ({
	profile,
	news: news.slice(0, 5),
	publications,
	presentations: presentations.slice(0, 3),
	software,
	education,
	experience,
	service,
	teaching,
});
