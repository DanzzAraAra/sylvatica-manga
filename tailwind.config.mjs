/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'forget-blue': '#7693E0',
				'forget-purple': '#B69EE1',
				'forget-dark': '#1a1b26'
			}
		},
	},
	plugins: [],
}