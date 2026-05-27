import { getProducts } from "@/lib/shopify";
import { NextResponse } from "next/server";

const BASE_URL = "https://www.stellux.store";
const STORE_NAME = "Stellux";
const CURRENCY = "USD";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const products = await getProducts(250);

  const items = products
    .filter((p) => p.availableForSale)
    .map((product) => {
      const variant = product.variants.nodes[0];
      const price = variant?.price?.amount || "0";
      const comparePrice = variant?.compareAtPrice?.amount;
      const image = product.featuredImage?.url || "";
      const productUrl = `${BASE_URL}/products/${product.handle}`;
      const availability = variant?.availableForSale ? "in stock" : "out of stock";
      const condition = "new";

      return `
    <item>
      <g:id>${escapeXml(product.id)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description.slice(0, 5000))}</g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${price} ${CURRENCY}</g:price>
      ${comparePrice ? `<g:sale_price>${price} ${CURRENCY}</g:sale_price>` : ""}
      ${comparePrice ? `<g:sale_price_effective_date>2024-01-01T00:00+00:00/2030-01-01T00:00+00:00</g:sale_price_effective_date>` : ""}
      <g:condition>${condition}</g:condition>
      <g:brand>${escapeXml(product.vendor || STORE_NAME)}</g:brand>
      <g:product_type>${escapeXml(product.productType || "Home Decor")}</g:product_type>
      <g:google_product_category>594</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
      ${product.tags.map((tag) => `<g:custom_label_0>${escapeXml(tag)}</g:custom_label_0>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${STORE_NAME}</title>
    <link>${BASE_URL}</link>
    <description>Product feed for ${STORE_NAME} — premium ambient lighting</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
