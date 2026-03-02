/**
 * Typed re-exports of YAML data files.
 *
 * Each YAML file is imported via vite-plugin-yaml (resolved at build time),
 * then cast to the corresponding TypeScript type from $lib/types.
 */

import type {
	Education,
	Experience,
	NewsItem,
	Presentation,
	Profile,
	Publication,
	Service,
	Software,
	Teaching,
} from "$lib/types";

import profileData from "$lib/data/profile.yaml";
import educationData from "$lib/data/education.yaml";
import experienceData from "$lib/data/experience.yaml";
import serviceData from "$lib/data/service.yaml";
import newsData from "$lib/data/news.yaml";
import publicationsData from "$lib/data/publications.yaml";
import presentationsData from "$lib/data/presentations.yaml";
import softwareData from "$lib/data/software.yaml";
import teachingData from "$lib/data/teaching.yaml";

export const profile = profileData as unknown as Profile;
export const education = educationData as unknown as Education[];
export const experience = experienceData as unknown as Experience[];
export const service = serviceData as unknown as Service[];
export const news = newsData as unknown as NewsItem[];
export const publications = publicationsData as unknown as Publication[];
export const presentations = presentationsData as unknown as Presentation[];
export const software = softwareData as unknown as Software[];
export const teaching = teachingData as unknown as Teaching[];
