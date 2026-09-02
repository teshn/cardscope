import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  tcgSlug: z.string().min(2),
  cardPrintingId: z.string().min(4),
  categorySlug: z.string().optional(),
  locale: z.enum(["en", "de"]),
  referrer: z.enum(["direct", "search", "social", "internal", "unknown"]).default("unknown"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = bodySchema.parse(json);

    return NextResponse.json({
      ok: true,
      payload,
      message: "View event accepted. Connect this endpoint to persistent storage next.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Invalid payload.",
      },
      { status: 400 },
    );
  }
}
