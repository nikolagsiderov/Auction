import { Button, Card, Grid, TextField } from "@mui/material";
import { Formik } from "formik";

const CategoryForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;

  return (
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
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Заглавие"
                  color="info"
                  size="medium"
                  placeholder="Заглавие"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Описание"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Описание"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Създай
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};
export default CategoryForm;
