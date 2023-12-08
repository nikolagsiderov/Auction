import { useCallback, useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { H1, H6 } from "components/Typography";
import CustomTextField from "components/CustomTextField";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import EyeToggleButton from "./EyeToggleButton";
import api from "../../../../shared/api/authentication";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jwt-decode";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.value);

  useEffect(() => {
    if (accessToken && jwt(accessToken).exp * 1000 <= Date.now()) {
      router.push("/");
    }
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(!loading);
    setSubmitted(!submitted);
    let authenticated = await api.signUp(dispatch, values);

    if (authenticated) {
      if (router.query.returnUrl) {
        const returnUrl = router.query.returnUrl;
        router.push(returnUrl);
      } else {
        router.push("/");
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
          Създай своя профил в Beeds.bg
        </H1>

        <CustomTextField
          mb={1.5}
          fullWidth
          name="firstName"
          size="small"
          label="Име"
          variant="outlined"
          onBlur={handleBlur}
          value={values.firstName}
          onChange={handleChange}
          placeholder="Иван"
          error={!!touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
        />

        <CustomTextField
          mb={1.5}
          fullWidth
          name="lastName"
          size="small"
          label="Име"
          variant="outlined"
          onBlur={handleBlur}
          value={values.lastName}
          onChange={handleChange}
          placeholder="Иванов"
          error={!!touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
        />

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
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Парола"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
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

        <CustomTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Потвърди парола"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <FormControl error={!!touched.agreement && !!errors.agreement}>
          <FormControlLabel
            name="agreement"
            className="agreement"
            onChange={handleChange}
            control={
              <Checkbox
                size="small"
                color="secondary"
                checked={values.agreement || false}
              />
            }
            label={
              <FlexBox
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
              >
                Съгласявам се с
                <a href="/terms" target="_blank" rel="noreferrer noopener">
                  <H6 ml={1} borderBottom="1px solid" borderColor="text.dark">
                    Условията на платформата
                  </H6>
                </a>
              </FlexBox>
            }
          />
          <p>Съгласието с условията при регистрация е задължително.</p>
        </FormControl>

        {loading ? (
          <FlexRowCenter>
            <CircularProgress />
          </FlexRowCenter>
        ) : (
          <>
            {submitted ? (
              <>
                <div style={{ color: "red" }}>Невъзможна регистрация.</div>
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
              style={{ textTransform: "none" }}
            >
              Създай профил
            </Button>
          </>
        )}
      </form>

      <SocialButtons />
      <FlexRowCenter mt="1.25rem">
        <Box>Вече имаш профил?</Box>
        <Link href="/login" passHref legacyBehavior>
          <a>
            <H6 ml={1} borderBottom="1px solid" borderColor="text.dark">
              Влез
            </H6>
          </a>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  firstName: yup.string().required("Задължително поле"),
  lastName: yup.string().required("Задължително поле"),
  email: yup.string().email("invalid email").required("Задължително поле"),
  password: yup.string().required("Задължително поле"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Паролите не съвпадат")
    .required("Моля потвърди парола"),
  agreement: yup.bool().required().oneOf([true]),
});

export default Signup;
