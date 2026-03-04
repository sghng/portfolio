// ── Profile ──────────────────────────────────────────────────────────────────

export interface SocialLink {
	label?: string;
	url: string;
	icon: string;
}

export interface Profile {
	name: string;
	name_cn?: string;
	name_pinyin?: string;
	title: string;
	lab?: string;
	school?: string;
	bio: string;
	links: SocialLink[];
}

// ── News ─────────────────────────────────────────────────────────────────────

export interface NewsItem {
	date: string;
	message: string;
}

// ── Publications ─────────────────────────────────────────────────────────────

export interface Publication {
	type: string;
	title: string;
	authors: string[];
	journal?: string;
	year: number;
	featured?: boolean;
	status?: string;
	tags?: string[];
}

// ── Presentations ────────────────────────────────────────────────────────────

export interface Presentation {
	title: string;
	event: string;
	date: string;
	type: string;
	place?: string;
	link?: string;
}

// ── Software ─────────────────────────────────────────────────────────────────

export interface Software {
	name: string;
	language: string;
	homepage?: string;
	source?: string;
	role?: string[];
}

// ── Education ────────────────────────────────────────────────────────────────

export interface Education {
	degree: string;
	field?: string;
	institution: string;
	institution_url?: string;
	location?: string;
	start: string;
	end: string;
	gpa?: string;
	highlights?: string[];
}

// ── Teaching ─────────────────────────────────────────────────────────────────

export interface Teaching {
	course: string;
	role: string;
	term: string;
	institution: string;
}

// ── Service ──────────────────────────────────────────────────────────────────

export interface Service {
	organization: string;
	institution: string;
	role: string;
	category: string;
}

// ── Experience ───────────────────────────────────────────────────────────────

export interface Experience {
	title: string;
	organization: string;
	url?: string;
	location?: string;
	start: string;
	end?: string;
	description?: string;
}
