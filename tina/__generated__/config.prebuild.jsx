// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.VITE_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.VITE_TINA_TOKEN || "",
  build: {
    outputFolder: "tina-admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "src/content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        match: {
          include: "home"
        },
        fields: [
          {
            name: "seo",
            label: "SEO Meta Data",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Meta Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Meta Keywords" }
            ]
          },
          {
            name: "heroImages",
            label: "Hero Images",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.alt };
              }
            },
            fields: [
              { type: "image", name: "img", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" }
            ]
          },
          {
            name: "hero",
            label: "Hero Section",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "titleLine3", label: "Title Line 3" },
              { type: "string", name: "contactButtonText", label: "Contact Button Text" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            name: "about",
            label: "About Section",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "titleLine3", label: "Title Line 3" },
              { type: "image", name: "image", label: "Side Image" },
              { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } }
            ]
          },
          {
            name: "stats",
            label: "Stats",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              }
            },
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label", ui: { component: "textarea" } },
              { type: "string", name: "iconName", label: "Icon Name" }
            ]
          },
          {
            name: "brandStatement",
            label: "Brand Statement",
            type: "object",
            fields: [
              { type: "image", name: "image", label: "Background Image" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "titleLine3", label: "Title Line 3" },
              { type: "string", name: "sinceText1", label: "Since Text 1" },
              { type: "string", name: "sinceText2", label: "Since Text 2" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            name: "expertiseSection",
            label: "Expertise Section",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" }
            ]
          },
          {
            name: "whyChooseUs",
            label: "Why Choose Us",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              {
                name: "reasons",
                label: "Reasons",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  }
                },
                fields: [
                  { type: "string", name: "title", label: "Title", ui: { component: "textarea" } },
                  { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            name: "bottomStatement",
            label: "Bottom Statement",
            type: "object",
            fields: [
              { type: "string", name: "paragraph", label: "Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" }
            ]
          },
          {
            name: "happyClients",
            label: "Happy Clients",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              }
            },
            fields: [
              { type: "string", name: "name", label: "Client Name" },
              { type: "image", name: "logo", label: "Client Logo" }
            ]
          }
        ]
      },
      {
        name: "about",
        label: "About Page",
        path: "src/content",
        match: {
          include: "about"
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            name: "seo",
            label: "SEO Meta Data",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Meta Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Meta Keywords" }
            ]
          },
          {
            name: "hero",
            label: "Hero Section",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            name: "mainSection",
            label: "Main Split Section",
            type: "object",
            fields: [
              { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "image", name: "image", label: "Image" }
            ]
          },
          {
            name: "stats",
            label: "Statistics",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label })
            },
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label", ui: { component: "textarea" } },
              { type: "string", name: "iconName", label: "Icon Name (Lucide)" }
            ]
          },
          {
            name: "mission",
            label: "Mission",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }
            ]
          },
          {
            name: "vision",
            label: "Vision",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }
            ]
          },
          {
            name: "founder",
            label: "Founder Section",
            type: "object",
            fields: [
              { type: "string", name: "sectionSubtitle", label: "Section Subtitle" },
              { type: "string", name: "sectionTitleLine1", label: "Title Line 1" },
              { type: "string", name: "sectionTitleLine2", label: "Title Line 2" },
              { type: "image", name: "image", label: "Founder Image" },
              { type: "string", name: "name", label: "Founder Name" },
              { type: "string", name: "role", label: "Founder Role" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "aboutMyselfText", label: "About Myself Paragraphs", list: true, ui: { component: "textarea" } },
              { type: "string", name: "expertiseText", label: "Expertise Text", ui: { component: "textarea" } }
            ]
          },
          {
            name: "credentials",
            label: "Credentials",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "items", label: "List Items", list: true }
            ]
          },
          {
            name: "achievements",
            label: "Achievements",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "items", label: "List Items", list: true }
            ]
          },
          {
            name: "whyChooseUs",
            label: "Why Choose Us Highlights",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                name: "highlights",
                label: "Highlights",
                type: "object",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title })
                },
                fields: [
                  { type: "string", name: "title", label: "Title", ui: { component: "textarea" } },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "iconName", label: "Icon Name (Lucide)" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "services",
        label: "Services Catalog",
        path: "src/content",
        match: {
          include: "services"
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            name: "seo",
            label: "SEO Meta Data",
            type: "object",
            fields: [
              { type: "string", name: "title", label: "Meta Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Meta Keywords" }
            ]
          },
          {
            name: "hero",
            label: "Hero Section",
            type: "object",
            fields: [
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "catalog",
            label: "Services",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
              }
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "slug", label: "Slug (URL path)" },
              { type: "string", name: "icon", label: "Icon Name" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "sections",
                label: "Service Level Sections",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Section" }) },
                fields: [
                  { type: "string", name: "eyebrow", label: "Eyebrow" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "accent", label: "Accent Word" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "listItems", label: "List Items", list: true }
                ]
              },
              {
                type: "object",
                name: "items",
                label: "Service Items",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name || "Item" }) },
                fields: [
                  { type: "string", name: "name", label: "Item Name" },
                  { type: "string", name: "slug", label: "Item Slug" },
                  {
                    type: "object",
                    name: "sections",
                    label: "Detail Sections",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title || "Section" }) },
                    fields: [
                      { type: "string", name: "eyebrow", label: "Eyebrow" },
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "accent", label: "Accent Word" },
                      { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                      { type: "string", name: "listItems", label: "List Items", list: true }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "gallery",
        label: "Gallery Page",
        path: "src/content",
        match: { include: "gallery" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Page Header",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "string",
            name: "categories",
            label: "Gallery Categories (Filters)",
            list: true
          },
          {
            type: "object",
            name: "photos",
            label: "Gallery Cards",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Gallery Card" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "src", label: "Cover Image URL" },
              { type: "string", name: "category", label: "Category (Must exactly match a filter)" },
              {
                type: "object",
                name: "mediaItems",
                label: "Relevant Photos & Videos",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.type || "Media Item" }) },
                fields: [
                  {
                    type: "string",
                    name: "type",
                    label: "Media Type",
                    options: ["image", "video"],
                    required: true
                  },
                  {
                    type: "image",
                    name: "src",
                    label: "Media File URL",
                    description: "WARNING: STRICT 50MB LIMIT for videos. Please compress videos before uploading."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "testimonials",
        label: "Testimonials Page",
        path: "src/content",
        match: { include: "testimonials" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Page Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "overallRating",
            label: "Overall Rating Box",
            fields: [
              { type: "string", name: "score", label: "Score (e.g. 4.8)" },
              { type: "string", name: "totalReviews", label: "Total Reviews (e.g. 150+)" }
            ]
          },
          {
            type: "object",
            name: "featured",
            label: "Featured Testimonial",
            fields: [
              { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "name", label: "Client Name" },
              { type: "string", name: "role", label: "Client Role" },
              { type: "string", name: "initials", label: "Initials" }
            ]
          },
          {
            type: "object",
            name: "items",
            label: "Testimonials",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Testimonial" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "name", label: "Client Name" },
              { type: "string", name: "role", label: "Client Role / Event Type" },
              { type: "string", name: "initials", label: "Initials (Avatar)" },
              { type: "string", name: "offset", label: "CSS Offset (e.g. lg:mt-10) - Do not change unless needed" }
            ]
          }
        ]
      },
      {
        name: "careers",
        label: "Careers Page",
        path: "src/content",
        match: { include: "careers" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Page Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "jobs",
            label: "Job Postings",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Job Posting" }) },
            fields: [
              { type: "string", name: "id", label: "Job ID (Used for URL slug, e.g. event-manager)" },
              { type: "string", name: "title", label: "Job Title" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "experience", label: "Experience Required" },
              { type: "string", name: "jobType", label: "Job Type (e.g. Full-Time)" },
              { type: "string", name: "companyDescription", label: "Company Description", ui: { component: "textarea" } },
              { type: "string", name: "mandatoryCriteria", label: "Mandatory Criteria", list: true },
              { type: "string", name: "responsibilities", label: "Responsibilities", list: true },
              { type: "string", name: "workingConditions", label: "Working Conditions", list: true }
            ]
          }
        ]
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "src/content",
        match: { include: "contact" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords" }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Page Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2 (Italicized)" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "contactCards",
            label: "Contact Details Blocks",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Card" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "icon", label: "Icon Name (e.g. Phone, Mail, MapPin)" },
              { type: "string", name: "lines", label: "Text Lines", list: true },
              { type: "string", name: "hrefs", label: "HREFs for links (optional, must map 1:1 to lines)", list: true }
            ]
          },
          {
            type: "object",
            name: "socials",
            label: "Social Media Links",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Social Link" }) },
            fields: [
              { type: "string", name: "label", label: "Label (e.g. Instagram)" },
              { type: "string", name: "url", label: "URL" },
              { type: "string", name: "icon", label: "Icon Component (e.g. FaInstagram)" },
              { type: "string", name: "className", label: "CSS Background Class (e.g. bg-[#1F1F1F])" }
            ]
          }
        ]
      },
      {
        name: "franchise",
        label: "Franchise Page",
        path: "src/content",
        match: { include: "franchise" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "header",
            label: "Page Header",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "titleItalic", label: "Title (Italicized)" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "highlight", label: "Highlight Text" }
            ]
          },
          {
            type: "object",
            name: "sections",
            label: "Main Content Sections (Grid)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Section" }) },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "icon", label: "Icon Name (e.g. TrendingUp, Briefcase)" },
              { type: "string", name: "items", label: "Bullet Points", list: true }
            ]
          },
          { type: "string", name: "modelsTitle", label: "Models Section Title" },
          {
            type: "object",
            name: "models",
            label: "Franchise Models",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Model" }) },
            fields: [
              { type: "string", name: "name", label: "Model Name" },
              { type: "string", name: "investment", label: "Investment Amount" }
            ]
          },
          { type: "string", name: "visionTitle", label: "Vision Section Title" },
          { type: "string", name: "vision", label: "Vision Items (List of stats)", list: true },
          {
            type: "object",
            name: "closing",
            label: "Closing Section",
            fields: [
              { type: "string", name: "line1", label: "Line 1" },
              { type: "string", name: "line1Italic", label: "Line 1 (Italicized part)" },
              { type: "string", name: "line2", label: "Line 2" }
            ]
          }
        ]
      },
      {
        name: "membership",
        label: "Membership Page",
        path: "src/content",
        match: { include: "membership" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Metadata",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleItalic", label: "Title (Italicized part)" },
              { type: "string", name: "titleLine3", label: "Title Line 3" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "badges", label: "Badges", list: true }
            ]
          },
          {
            type: "object",
            name: "whySection",
            label: "Why Become a Member Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "cards",
                label: "Feature Cards",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Card" }) },
                fields: [
                  { type: "string", name: "icon", label: "Icon Name (e.g. Percent, CalendarCheck)" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "benefitsSection",
            label: "Membership Benefits Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "cards",
                label: "Benefit Columns",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Column" }) },
                fields: [
                  { type: "string", name: "icon", label: "Icon Name" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "items", label: "Benefit Items", list: true },
                  { type: "string", name: "gradient", label: "CSS Gradient Classes (Do not change unless needed)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "milestoneSection",
            label: "Milestones Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description" },
              {
                type: "object",
                name: "milestones",
                label: "Milestones Timeline",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Milestone" }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "icon", label: "Icon Name" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "rewardsSection",
            label: "Rewards Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "rewards", label: "Reward Items", list: true }
            ]
          },
          {
            type: "object",
            name: "exclusiveOffersSection",
            label: "Exclusive Offers Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "offers", label: "Offers", list: true }
            ]
          },
          {
            type: "object",
            name: "perfectForSection",
            label: "Perfect For Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object",
                name: "items",
                label: "Audience Targets",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Target" }) },
                fields: [
                  { type: "string", name: "title", label: "Text" },
                  { type: "string", name: "icon", label: "Icon Name" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "promiseSection",
            label: "Our Promise Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
              { type: "string", name: "signature", label: "Signature Line" }
            ]
          },
          {
            type: "object",
            name: "ctaSection",
            label: "Call to Action Section",
            fields: [
              { type: "string", name: "titleLine1", label: "Title Line 1" },
              { type: "string", name: "titleLine2", label: "Title Line 2" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
