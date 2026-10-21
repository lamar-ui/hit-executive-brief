import fs from "node:fs";
import path from "node:path";

// RSI home page. Single source of truth: content/home.html (built from ~/RSI_Lead_Engine/content/home_body.html).
// The intake form posts to the Netlify-hosted form on rsi-clarity.netlify.app, which emails RSI.
export const dynamic = "force-static";

export default function Home() {
  const html = fs.readFileSync(path.join(process.cwd(), "content", "home.html"), "utf8");
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
