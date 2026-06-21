import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * utility-suite — long-tail marketing + docs content for the Asteris Utility
 * Suite product section. Migrated from the standalone asterisforwordpress.com
 * (Astro) site, June 2026. Marketing entries live at the top level and route
 * via their `url` frontmatter; docs entries live under `docs/` and route by
 * file path. Rendered by src/pages/asteris-utility-suite/[...slug].astro.
 */
const utilitySuite = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/utility-suite' }),
  schema: z.object({
    title: z.string(),
    // Marketing pages route via `url`; docs entries omit it and route by path.
    url: z.string().optional(),
    description: z.string().optional(),
    meta_description: z.string().optional(),
    og_title: z.string().optional(),
    og_description: z.string().optional(),
    og_image: z.string().optional(),
    canonical: z.string().url().optional(),
    primary_keyword: z.string().optional(),
    primary_keyword_us_vol: z.number().optional(),
    primary_keyword_kd: z.number().optional(),
    secondary_keywords: z.array(z.string()).optional(),
    schema_type: z.string().optional(),
    faq_schema: z.boolean().optional(),
    internal_links_out: z.array(z.string()).optional(),
    verified_date: z.coerce.string().optional(),
    next_verification: z.coerce.string().optional(),
    ai_overview_optimised: z.boolean().optional(),
    noindex: z.boolean().optional(),
    legal_review_required: z.boolean().optional(),
    rich_override: z.boolean().optional(),
    pillar: z.string().optional(),
    cannibalisation_note: z.string().optional(),
    ai_bot_policy: z.string().optional(),
    brand_disambiguation: z.string().optional(),
    // Starlight docs frontmatter (docs/ entries only).
    sidebar: z
      .object({
        order: z.number().optional(),
        label: z.string().optional(),
        hidden: z.boolean().optional(),
      })
      .optional(),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
    aio_audit: z
      .object({
        faq_count: z.number().optional(),
        has_direct_answer_lead: z.boolean().optional(),
        has_concise_definitions: z.boolean().optional(),
        blockers: z.array(z.string()).optional(),
        score: z.number().min(1).max(5).optional(),
      })
      .optional(),
  }),
});

export const collections = { 'utility-suite': utilitySuite };
