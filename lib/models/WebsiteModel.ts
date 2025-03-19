import { Schema, model } from 'mongoose';

// Define the tech stack categories
const techStackCategories: string[] = [
  "CMS",
  "Message boards",
  "Database managers",
  "Documentation tools",
  "Widgets",
  "Ecommerce",
  "Photo galleries",
  "Wikis",
  "Hosting panels",
  "Analytics",
  "Blogs",
  "JavaScript frameworks",
  "Issue trackers",
  "Video players",
  "Comment systems",
  "Security",
  "Font scripts",
  "Web frameworks",
  "Miscellaneous",
  "Editor",
  "LMS",
  "Web servers",
  "Caching",
  "Rich text editors",
  "JavaScript graphics",
  "Mobile frameworks",
  "Programming languages",
  "Operating systems",
  "Search engines",
  "Webmail",
  "CDN",
  "Marketing automation",
  "Web server extensions",
  "Databases",
  "Maps",
  "Advertising",
  "Network services",
  "Media servers",
  "Webcams",
  "Payment processors",
  "Tag managers",
  "CI",
  "Remote Access",
  "Development",
  "Network storage",
  "Feed readers",
  "DMS",
  "Page builder",
  "Live chat",
  "CRM",
  "SEO",
  "Accounting",
  "Cryptominers",
  "Static site generators",
  "User onboarding",
  "JavaScript libraries",
  "Containers",
  "PaaS",
  "IaaS",
  "Reverse proxies",
  "Load balancers",
  "UI frameworks",
  "Cookie compliance",
  "Accessibility",
  "Authentication",
  "SSL/TLS certificate authorities",
  "Affiliate programs",
  "Appointment scheduling",
  "Surveys",
  "A/B testing",
  "Email",
  "Personalisation",
  "Retargeting",
  "RUM",
  "Geolocation",
  "WordPress themes",
  "Shopify themes",
  "Drupal themes",
  "Browser fingerprinting",
  "Loyalty & rewards",
  "Feature management",
  "Segmentation",
  "WordPress plugins",
  "Hosting",
  "Translation",
  "Reviews",
  "Buy now pay later",
  "Performance",
  "Reservations & delivery",
  "Referral marketing",
  "Digital asset management",
  "Content curation",
  "Customer data platform",
  "Cart abandonment",
  "Shipping carriers",
  "Shopify apps",
  "Recruitment & staffing",
  "Returns",
  "Livestreaming",
  "Ticket booking",
  "Augmented reality",
  "Cross border ecommerce",
  "Fulfilment",
  "Ecommerce frontends",
  "Domain parking",
  "Form builders",
  "Fundraising & donations",
  "Phone number",
  "Skype",
  "WhatsApp",
  "Email address",
  "Email address (verified)",
  "Email address (safe)",
  "Twitter",
  "Facebook",
  "Instagram",
  "GitHub",
  "TikTok",
  "YouTube",
  "Pinterest",
  "LinkedIn",
  "Owler",
  "Title",
  "Description",
  "Copyright",
  "Copyright year",
  "Responsive",
  "schema.org types",
  "Cert organisation",
  "Cert country",
  "Cert state",
  "Cert locality",
  "Cert issuer",
  "Cert protocol",
  "Cert expiry",
  "SPF record",
  "DMARC record",
  "SSL/TLS enabled",
  "Google Analytics",
  "Google AdSense",
  "Medianet",
  "Facebook",
  "Optimizely",
  "Company name",
  "Inferred company name",
  "Industry",
  "About",
  "Locations",
  "Company size",
  "Company type",
  "Company founded",
  "People"
];

const websiteCategories: string[] = [
  "E-commerce",
  "Social Media",
  "Blogs",
  "News and Information",
  "Entertainment",
  "Education",
  "Technology",
  "Health",
  "Business",
  "Finance",
  "Travel",
  "Government",
  "Nonprofit",
  "Real Estate",
  "Sports",
  "Music",
  "Lifestyle",
  "Food and Drink",
  "Retail",
  "Forums",
  "Adult Content",
  "Other"
];


// Define the Website interface for TypeScript
interface TechStack {
  category: string; // The specific category for tech stack
  technologies: string[]; // List of technologies under the category
}

interface Infrastructure {
  domain: string;
  requests: number;
  ip: string;
  asnDescription: string;
}

interface PageSpeed {
  harData: any; // HAR data for page speed
  loadTime: number; // Load time in milliseconds
  requests: number; // Total number of requests
}

interface SSLDetails {
  sslVersion: string;
  certificateIssuer: string;
  isValid: boolean;
}

interface Visit {
  date: Date;
  statusCode: number;
  sslDetails: SSLDetails;
  techStack: TechStack[];
  infrastructure: Infrastructure[];
  pageSpeed: PageSpeed;
}

interface Website {
  url: string; // The website's URL
  websiteCategory: string; // The category of the website (e.g. News, E-commerce)
  visits: Visit[]; // Array of visit data for the website
  techStackCategory: string[]; // Array of tech stack categories
}

// Website schema definition
const websiteSchema = new Schema<Website>({
  url: { type: String, required: true, unique: true }, // Unique URL for the website
  websiteCategory: { type: String, required: true, enum: websiteCategories }, // Example categories
  visits: [
    {
      date: { type: Date, required: true },
      statusCode: { type: Number, required: true },
      sslDetails: {
        sslVersion: { type: String },
        certificateIssuer: { type: String },
        isValid: { type: Boolean }
      },
      techStack: [
        {
          category: { type: String, enum: techStackCategories, required: true },
          technologies: { type: [String], required: true }
        }
      ],
      infrastructure: [
        {
          domain: { type: String, required: true },
          requests: { type: Number, required: true },
          ip: { type: String, required: true },
          asnDescription: { type: String, required: true }
        }
      ],
      pageSpeed: {
        harData: { type: Object },
        loadTime: { type: Number },
        requests: { type: Number }
      }
    }
  ],
  techStackCategory: { type: [String], required: true } // New field to store tech stack categories
});

// Create the model for the Website
const WebsiteModel = model<Website>("Website", websiteSchema);

export { WebsiteModel };