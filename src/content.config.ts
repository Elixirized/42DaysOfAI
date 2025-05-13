import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
  days: defineCollection({
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
		// turn "description: - foo\n- bar" into ["foo", "bar"]
		// JSH: Doe NOT work ...
    descriptionArray: ({ data }) =>
			typeof data.description === 'string'
				? data.description
						.split('\n')
						.filter((l) => l.trim().startsWith('-'))
						.map((l) => l.replace(/^- */, '').trim())
				: data.description ?? [],
			},
		}),
	};