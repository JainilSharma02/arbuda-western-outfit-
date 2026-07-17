import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arbuda-western-outfit.vercel.app';
  
  const productIds = [5, 555, 777, 888, 900, 1550, 1552, 1553, 1554];
  const productEntries = productIds.map((id) => ({
    url: `${baseUrl}/product/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  const categories = ['jeans', 'lower', 'night-wear', 't-shirt', 'top'];
  const categoryEntries = categories.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/clothing',
    '/dresses',
    '/western',
    '/size-guide',
    '/contact',
    '/faq',
    '/new',
    '/sale',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes, ...productEntries, ...categoryEntries];
}
