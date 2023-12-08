import { useCallback, useState, useEffect } from "react";
import { Button, Card, Box, styled, CircularProgress } from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { H1, H6 } from "components/Typography";
import CustomTextField from "components/CustomTextField";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import api from "../../../../shared/api/authentication";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jwt-decode";

export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.text.dark
      : theme.palette.text.disabled,
  },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));
const Login = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const accessToken = useSelector((state) => state.accessToken.value);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && jwt(accessToken).exp * 1000 <= Date.now()) {
      router.push("/");
    }
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(!loading);
    setSubmitted(!submitted);
    let authenticated = await api.authenticate(dispatch, values);

    if (authenticated) {
      if (router.query.returnUrl) {
        const returnUrl = router.query.returnUrl;
        router.push(returnUrl);
      } else {
        setTimeout(() => props.toggleDialog(), 3000);
      }
    } else {
      setTimeout(() => setLoading(false), 3000);
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <img
          src="/assets/logo4x4lightcircle.png"
          style={{ margin: "auto", display: "block" }}
          height={44}
        />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Добре дошли в Beeds.bg
        </H1>

        <CustomTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Имейл"
          placeholder="ivanivanov@mail.bg"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <CustomTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Парола"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />
        {loading ? (
          <FlexRowCenter>
            <CircularProgress />
          </FlexRowCenter>
        ) : (
          <>
            {submitted ? (
              <>
                <div style={{ color: "red" }}>
                  Грешно потребителско име или парола.
                </div>
                <br />
              </>
            ) : null}
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                height: 44,
              }}
            >
              Влез
            </Button>
          </>
        )}
      </form>

      <SocialButtons />

      <FlexRowCenter mt="1.25rem">
        <Box>Нямаш собствен профил?</Box>
        <Link href="/signup" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="text.dark">
              Създай
            </H6>
          </a>
        </Link>
      </FlexRowCenter>

      <FlexBox
        justifyContent="center"
        bgcolor="text.disabled"
        borderRadius="4px"
        py={2.5}
        mt="1.25rem"
      >
        Забравил си паролата?
        <Link href="/reset-password" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="text.dark">
              Обнови я
            </H6>
          </a>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Невалиден имейл формат")
    .required("Задължително поле"),
  password: yup.string().required("Задължително поле"),
});

export default Login;
