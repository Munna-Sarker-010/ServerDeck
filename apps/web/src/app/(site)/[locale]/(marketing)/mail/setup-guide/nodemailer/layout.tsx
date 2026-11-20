import { localizedMetadata } from "@/i18n/metadata";

import type { Metadata, ResolvingMetadata } from "next";
import { inheritSocialImages } from "@/lib/social-metadata";
import type { ReactNode } from "react";

const TITLE = "Send Mail via Code (Nodemailer / SMTP)";
const DESCRIPTION =
  "Send transactional email from your app over SMTP. A Node.js / Nodemailer example — the same credentials and fields work in any language.";
const PATH = "/mail/setup-guide/nodemailer";

const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} - ServerDeck`,
    description: DESCRIPTION,
    url: PATH,
    type: "article",
    siteName: "ServerDeck",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${TITLE} - ServerDeck`, description: DESCRIPTION },
};

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return localizedMetadata(await inheritSocialImages(metadata, parent));
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
