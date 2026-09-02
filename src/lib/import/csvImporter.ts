import { parse } from "csv-parse/sync";
import { z } from "zod";

const importRowSchema = z.object({
  tcg: z.string().min(2),
  card_name: z.string().min(1),
  card_slug: z.string().min(1),
  printing_slug: z.string().min(1),
  set_name: z.string().min(1),
  set_code: z.string().min(1),
  card_number: z.string().min(1),
  rarity: z.string().min(1),
  illustrator: z.string().min(1),
  width_mm: z.coerce.number().positive(),
  height_mm: z.coerce.number().positive(),
  weight_grams: z.coerce.number().positive(),
  printed_at: z.string().min(8),
  variant: z.string().min(1),
  language: z.string().min(2),
  image_url: z.string().url(),
});

export type ImportRow = z.infer<typeof importRowSchema>;

export function parseCardCsv(csvString: string): ImportRow[] {
  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return z.array(importRowSchema).parse(records);
}
