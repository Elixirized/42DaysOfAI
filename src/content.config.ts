// src/content/config.ts
import { z, defineCollection } from 'astro:content';

// 1️⃣ Shared schema
const baseSchema = z
  .object({
    title:       z.string(),
    description: z.union([z.string(), z.array(z.string())]),
    pubDate:     z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage:   z.string().optional(),
  })
  .transform((data) => {
    // compute descriptionArray
    const descriptionArray = typeof data.description === 'string'
      ? data.description
          .split('\n')
          .filter((l) => l.trim().startsWith('-'))
          .map((l) => l.replace(/^- */, '').trim())
      : data.description ?? [];
    return { ...data, descriptionArray };
  });


// 3️⃣ Define each collection using the shared pieces
const daysCollection = defineCollection({
  schema:   baseSchema,
});

const draftCollection = defineCollection({
  schema:   baseSchema,
});

const sidebarsCollection = defineCollection({
	schema: z.any(),  // no computed needed here, unless you want to derive extra props
});

// 4️⃣ Export them all
export const collections = {
  days:   daysCollection,
  draft:  draftCollection,
	sidebars: sidebarsCollection,
};
