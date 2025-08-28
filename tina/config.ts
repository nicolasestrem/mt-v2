import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || '', // Get this from tina.io
  token: process.env.TINA_TOKEN || '', // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'hero',
        label: 'Hero Section',
        path: 'content/hero',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            required: true,
          },
          {
            type: 'datetime',
            name: 'eventDate',
            label: 'Event Date',
            required: true,
            description: 'The date for the countdown timer (October 30, 2025)',
          },
          {
            type: 'string',
            name: 'buttonText',
            label: 'Button Text',
            required: true,
          },
          {
            type: 'string',
            name: 'buttonLink',
            label: 'Button Link',
            required: true,
          },
        ],
      },
      {
        name: 'mission',
        label: 'Mission Section',
        path: 'content/mission',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'prefix',
            label: 'Prefix Text',
            required: true,
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'string',
            name: 'criteriaTitle',
            label: 'Criteria Title',
            required: true,
          },
          {
            type: 'object',
            name: 'criteria',
            label: 'Criteria Items',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'text',
                label: 'Criteria Text',
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: 'jury',
        label: 'Jury Members',
        path: 'content/jury',
        format: 'json',
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Name',
            required: true,
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title/Position',
            required: true,
          },
          {
            type: 'string',
            name: 'organization',
            label: 'Organization',
            required: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Photo',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'bio',
            label: 'Biography',
            required: true,
          },
          {
            type: 'string',
            name: 'linkedin',
            label: 'LinkedIn URL',
          },
        ],
      },
      {
        name: 'criteria',
        label: 'Selection Criteria',
        path: 'content/criteria',
        format: 'json',
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Criteria Title',
            required: true,
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon Name',
            required: true,
            description: 'Name of the icon to use',
          },
          {
            type: 'rich-text',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display Order',
            required: true,
          },
        ],
      },
      {
        name: 'partners',
        label: 'Partner Organizations',
        path: 'content/partners',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Organization Name',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo',
            required: true,
          },
          {
            type: 'string',
            name: 'website',
            label: 'Website URL',
          },
          {
            type: 'string',
            name: 'type',
            label: 'Partner Type',
            options: ['main', 'media', 'sponsor'],
            required: true,
          },
        ],
      },
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          global: true,
        },
        fields: [
          {
            type: 'string',
            name: 'web3formsKey',
            label: 'Web3Forms API Key',
            description: 'Your Web3Forms API key for the contact form',
          },
          {
            type: 'string',
            name: 'linkedinFeedUrl',
            label: 'LinkedIn Feed URL',
            description: 'EmbedSocial or LinkedIn embed URL',
          },
          {
            type: 'object',
            name: 'footer',
            label: 'Footer Settings',
            fields: [
              {
                type: 'string',
                name: 'copyright',
                label: 'Copyright Text',
              },
              {
                type: 'object',
                name: 'links',
                label: 'Footer Links',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Link Text',
                  },
                  {
                    type: 'string',
                    name: 'url',
                    label: 'Link URL',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'about',
        label: 'About Section',
        path: 'content/about',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'intro',
            label: 'Introduction Question',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description Paragraphs',
            list: true,
            required: true,
          },
          {
            type: 'object',
            name: 'heroImage',
            label: 'Hero Image',
            fields: [
              {
                type: 'image',
                name: 'src',
                label: 'Image',
                required: true,
              },
              {
                type: 'string',
                name: 'alt',
                label: 'Alt Text',
                required: true,
              },
            ],
          },
          {
            type: 'object',
            name: 'partners',
            label: 'Partner Organizations',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name',
                required: true,
              },
              {
                type: 'image',
                name: 'logo',
                label: 'Logo',
                required: true,
              },
              {
                type: 'string',
                name: 'url',
                label: 'Website URL',
                required: true,
              },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: 'newsletter',
        label: 'Newsletter Section',
        path: 'content/newsletter',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'string',
            name: 'buttonText',
            label: 'Button Text',
            required: true,
          },
          {
            type: 'string',
            name: 'placeholderText',
            label: 'Email Placeholder Text',
            required: true,
          },
        ],
      },
    ],
  },
});