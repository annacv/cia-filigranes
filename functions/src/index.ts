import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Preview domains that should serve robots.txt with Disallow: /
const PREVIEW_DOMAINS = [
  "test-filigranes.web.app",
  "test-filigranes.firebaseapp.com",
];

// Production robots.txt content
const PRODUCTION_ROBOTS = `# Allow all search engines
User-agent: *
Allow: /assets/
Allow: /_nuxt/
Sitemap: https://www.ciafiligranes.net/sitemap.xml

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: PerplexityBot
Disallow: /`;

// Preview robots.txt content (disallows all)
const PREVIEW_ROBOTS = `User-agent: *
Disallow: /`;

export const robots = functions.https.onRequest((req, res) => {
  const host = req.get("host") || "";
  
  // Check if the request is from a preview domain
  const isPreviewDomain = PREVIEW_DOMAINS.some((domain) =>
    host.includes(domain)
  );

  // Set content type
  res.set("Content-Type", "text/plain");

  // Serve appropriate robots.txt
  if (isPreviewDomain) {
    res.send(PREVIEW_ROBOTS);
  } else {
    res.send(PRODUCTION_ROBOTS);
  }
});

