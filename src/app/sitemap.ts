import { MetadataRoute } from 'next';
import { db } from '@/db';
import { currentAffairs } from '@/db/schema';
import { eq } from 'drizzle-orm';

const BASE_URL = 'https://www.civilspage.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/aboutcse`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about-mentor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/subject/polity`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/subject/ethics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/updates`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/archives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/model-answers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/pyqs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/mock-tests`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/direct-query`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
  ];

  try {
    const publishedAffairs = await db
      .select({
        id: currentAffairs.id,
        updatedAt: currentAffairs.updatedAt,
        date: currentAffairs.date,
      })
      .from(currentAffairs)
      .where(eq(currentAffairs.published, true));

    const dynamicRoutes: MetadataRoute.Sitemap = publishedAffairs.map((item) => ({
      url: `${BASE_URL}/updates/${item.id}`,
      lastModified: item.updatedAt || new Date(item.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch {
    return staticRoutes;
  }
}
