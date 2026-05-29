import { Head as FreshHead } from "fresh/runtime";
import { SITE_DESCRIPTION, SITE_NAME } from "@/utils/constants.ts";
import Meta from "@/components/Meta.tsx";

interface HeadProps {
  title?: string;
  description?: string;
  href?: string;
  imageUrl?: string;
}

export default function Head({
  title,
  description,
  href,
  imageUrl,
}: HeadProps) {
  return (
    <FreshHead>
      <Meta
        title={title ?? SITE_NAME}
        description={description ?? SITE_DESCRIPTION}
        href={href}
        imageUrl={imageUrl ?? "/ns-app/apps.png"}
      />
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="./512.png" />
    </FreshHead>
  );
}
