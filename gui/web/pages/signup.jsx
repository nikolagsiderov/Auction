import SEO from "components/SEO";
import { FlexRowCenter } from "components/flex-box";
import Signup from "pages-sections/sessions/Signup";

const SignUpPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Beeds.bg: Регистрирай се" />
      <Signup />
    </FlexRowCenter>
  );
};
export default SignUpPage;
