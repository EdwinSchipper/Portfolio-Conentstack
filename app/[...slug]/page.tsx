import { getPage, isPreview } from "@/lib/contentstack";
import Page from "@/components/Page";
import Preview from "@/components/Preview";
import { notFound } from "next/navigation";

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = await getPage(path);

  if (!page && !isPreview) {
    notFound();
  }

  if (isPreview) {
    return <Preview path={path} initialPage={page} />;
  }

  return <Page page={page} />;
}
