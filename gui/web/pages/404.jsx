import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import SEO from "components/SEO";
import { FlexBox, FlexRowCenter } from "components/flex-box";
const Error404 = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();
  return (
    <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
      <SEO title="Beeds.bg: Страницата не е намерена" />

      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          sx={{
            m: 1,
          }}
          onClick={handleGoBack}
        >
          Назад
        </Button>

        <Link href="/" passHref legacyBehavior>
          <Button
            variant="contained"
            color="primary"
            sx={{
              m: 1,
            }}
          >
            Към началото
          </Button>
        </Link>
      </FlexBox>
    </FlexRowCenter>
  );
};
export default Error404;
