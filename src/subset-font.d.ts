declare module "subset-font" {
	function subsetFont(
		buffer: Buffer | Uint8Array,
		text: string,
		options?: { targetFormat?: "woff" | "woff2" | "truetype" | "sfnt" },
	): Promise<Buffer>;
	export default subsetFont;
}
