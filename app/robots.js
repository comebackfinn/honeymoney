export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
    ],
    sitemap: 'https://honeymoney.netlify.app/sitemap.xml',
  };
}
