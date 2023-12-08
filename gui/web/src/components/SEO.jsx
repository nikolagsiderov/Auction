import Head from "next/head";

const SEO = ({
  title,
  description,
  sitename = "Beeds.bg: Първият в България благотворителен аукцион",
}) => {
  return (
    <Head>
      <title>{`${title} | ${sitename}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
export default SEO;
