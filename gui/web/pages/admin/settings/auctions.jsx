import { Box, Card, Grid, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import AdminDashboardLayout from "components/layouts/admin";
import api from "../../../../shared/api/settings";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

Auctions.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};

export default function Auctions() {
  const router = useRouter();
  const accessToken = useSelector((state) => state.accessToken.value);

  const initialValues = {
    minimalStepAsPercentage: 0.1,
  };

  const validationSchema = yup.object().shape({
    minimalStepAsPercentage: yup.number().min(0.1).required("задължително"),
  });

  const handleFormSubmit = async (values) => {
    let success = await api.saveAuctionSettings(values, accessToken);

    if (success) {
      router.push(`/admin/settings/auctions`);
    } else {
      // Message user that category creation has not been successful
    }
  };

  return (
    <Box py={4}>
      <Card
        sx={{
          p: 6,
        }}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    name="minimalStepAsPercentage"
                    label="Минимална стъпка като % от текуща цена"
                    color="info"
                    type="number"
                    size="medium"
                    placeholder="0.1%"
                    value={values.minimalStepAsPercentage}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      !!touched.minimalStepAsPercentage &&
                      !!errors.minimalStepAsPercentage
                    }
                    helperText={
                      touched.minimalStepAsPercentage &&
                      errors.minimalStepAsPercentage
                    }
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Button variant="contained" color="info" type="submit">
                    Запази
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
