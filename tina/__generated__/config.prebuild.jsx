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
              { type: "string", name: "items", label: "Service Items", list: true }
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
