// Allow importing .yaml files as modules (via @modyfi/vite-plugin-yaml)
declare module "*.yaml" {
	const value: unknown;
	export default value;
}
