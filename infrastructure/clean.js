import fs from 'fs';

const paths = ['.netlify', '.svelte-kit', 'build', '.vite'];
// paths.push('node_modules');
for (const path of paths) {
	if (fs.existsSync(path)) {
		fs.rmSync(path, { recursive: true });
		console.log(`deleted ${path}`);
	}
}
