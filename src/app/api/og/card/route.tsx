import { ImageResponse } from "next/og";

import { getCardBySlug } from "@/data/mock-cards";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cardSlug = searchParams.get("cardSlug") ?? "";
  const printingSlug = searchParams.get("printingSlug") ?? "";

  const card = getCardBySlug(cardSlug, printingSlug);

  if (!card) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f7f2e6",
            color: "#161616",
            fontSize: 48,
          }}
        >
          CardScope
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#f7f2e6",
          color: "#161616",
          border: "10px solid #161616",
          padding: "36px",
          fontFamily: "monospace",
          gap: "36px",
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.imageUrl}
          alt={card.cardName}
          width="340"
          height="430"
          style={{ objectFit: "cover", border: "4px solid #161616" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.22em", fontSize: 20 }}>
            CardScope Inspection
          </p>
          <h1 style={{ fontSize: 62, margin: 0 }}>{card.cardName}</h1>
          <p style={{ fontSize: 28, margin: 0 }}>
            {card.setCode} {card.cardNumber}
          </p>
          <p style={{ fontSize: 24, margin: 0 }}>Illustrator: {card.illustrator}</p>
          <p style={{ fontSize: 24, margin: 0 }}>Variant: {card.facts.variant}</p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
