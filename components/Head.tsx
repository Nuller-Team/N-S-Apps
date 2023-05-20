import { Head as _Head } from "$fresh/runtime.ts";
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
    <_Head>
      <Meta
        title={title ?? SITE_NAME}
        description={description ?? SITE_DESCRIPTION}
        href={href}
        imageUrl={imageUrl ?? "/ns-app/apps.png"}
      />
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
    </_Head>
  );
}
