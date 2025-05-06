import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const days = defineCollection({
	// Load Markdown and MDX files in the `src/content/days/` directory.
	loader: glob({ base: './src/content/days', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		// allow string _or_ string-array
    description: z.union([z.string(), z.array(z.string())]),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
	// add a “computed” to always cast it to an array
	// JSH: Doe NOT work ...
  computed: {
    descriptionArray: ({ data }) =>
      typeof data.description === 'string'
        ? data.description.split('\n').filter((l) => l.trim().startsWith('-')).map((l) => l.replace(/^- */, '').trim())
        : data.description,
  },
});

export const collections = { days };
