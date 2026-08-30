import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.civilspage.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login/', '/api/admin/', '/api/r2/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Amazonbot', 'Applebot-Extended'],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/aboutcse', '/subject/*', '/updates', '/archives', '/model-answers', '/pyqs', '/mock-tests', '/about-mentor'],
        disallow: ['/login/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
