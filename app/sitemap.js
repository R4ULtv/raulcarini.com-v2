export default function sitemap() {
    return [
      {
        url: 'https://www.raulcarini.dev',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: 'https://www.raulcarini.dev/posts/shortly',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://www.raulcarini.dev/posts/multi-region-r2-bucket-system',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
  }