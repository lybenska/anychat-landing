import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anychat.ai', // TODO: confirm the public origin before launch (also SITE_URL in src/consts.ts)
  output: 'static',
  build: { assets: '_assets' },
  // `astro preview` behind a temporary tunnel (review links for colleagues): Cloudflare quick tunnel or localhost.run.
  vite: { preview: { allowedHosts: ['.trycloudflare.com', '.lhr.life'] } },
});
