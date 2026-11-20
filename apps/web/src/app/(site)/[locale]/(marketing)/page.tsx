import DownloadPage from "./download/page";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata() {
  return localizedMetadata({ alternates: { canonical: "/" } });
}

export default function HomePage() {
  return <DownloadPage />;
}
