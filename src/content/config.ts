// src/content/config.ts
import { defineCollection } from 'astro:content';
import { z } from 'zod';

export const collections = {
  days: defineCollection({
    // optional schema; remove if you don’t need validation
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      // add any other frontmatter fields here
    }),
  }),
};
