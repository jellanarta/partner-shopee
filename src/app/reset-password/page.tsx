import PageResetPassword from "./components/pageResetPassword";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token: string | undefined = params.token as string;
  return <PageResetPassword searchParams={token} />;
}
