import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Grid,
  TextField,
  FormGroup,
  FormLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import { UploadImageBox, StyledClear } from "../StyledComponents";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import apiCategories from "../../../../../shared/api/categories";

const ItemForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;
  const [files, setFiles] = useState([]);
  const [endDateValue, setEndDateValue] = useState(dayjs(new Date()));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async () =>
      await apiCategories.getCategories().then((data) => setCategories(data));
  }, []);

  const handleChangeDropZone = (files, values) => {
    files.forEach((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setFiles(files);
    values.files = files;
  };

  const handleFileDelete = (file, values) => () => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
    values.files = files;
  };

  const handleSnipingProtectionSwitch = (e, values) => {
    values.snipingProtection = e.target.checked;
  };

  const handleEndDateChange = (newValue, values) => {
    values.endDate = newValue;
    setEndDateValue(newValue);
  };

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
              <Grid item sm={2} xs={12}>
                <TextField
                  fullWidth
                  name="startingPrice"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.startingPrice}
                  label="Стартова цена (в лева)"
                  onChange={handleChange}
                  placeholder="Стартова цена (в лева)"
                  error={!!touched.startingPrice && !!errors.startingPrice}
                  helperText={touched.startingPrice && errors.startingPrice}
                />
              </Grid>

              <Grid item sm={2} xs={12}>
                <TextField
                  fullWidth
                  name="buyNowPrice"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.buyNowPrice}
                  label="Купи сега цена (в лева)"
                  onChange={handleChange}
                  placeholder="Купи сега цена (в лева)"
                  error={!!touched.buyNowPrice && !!errors.buyNowPrice}
                  helperText={touched.buyNowPrice && errors.buyNowPrice}
                />
              </Grid>

              <Grid item sm={2} xs={12}>
                <TextField
                  fullWidth
                  name="reservedPrice"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.reservedPrice}
                  label="Запазена цена (в лева)"
                  onChange={handleChange}
                  placeholder="Запазена цена (в лева)"
                  error={!!touched.reservedPrice && !!errors.reservedPrice}
                  helperText={touched.reservedPrice && errors.reservedPrice}
                />
              </Grid>
              {categories.length > 0 ? (
                <>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="categoryID-label">
                        Дарителска категория
                      </InputLabel>
                      <Select
                        labelId="categoryID-label"
                        id="categoryID"
                        name="categoryID"
                        value={values.categoryID}
                        label="Дарителска категория"
                        onChange={handleChange}
                        error={!!touched.categoryID && !!errors.categoryID}
                        helperText={touched.categoryID && errors.categoryID}
                      >
                        {categories.map(function (category) {
                          return (
                            <MenuItem key={category.id} value={category.id}>
                              {category.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              ) : null}
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

              <Grid item sm={3} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    name="endDate"
                    id="endDate"
                    label="Срок"
                    value={endDateValue}
                    onChange={(e) => handleEndDateChange(e, values)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item sm={3} xs={4}>
                <FormGroup>
                  <FormLabel>Sniping Protection</FormLabel>
                  <Switch
                    name="snipingProtection"
                    color="info"
                    onChange={(e) => handleSnipingProtectionSwitch(e, values)}
                  />
                </FormGroup>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DropZone
                  onChange={(files) => handleChangeDropZone(files, values)}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => {
                    return (
                      <UploadImageBox key={index}>
                        <img src={file.preview} width="100%" alt="preview" />
                        <StyledClear onClick={handleFileDelete(file, values)} />
                      </UploadImageBox>
                    );
                  })}
                </FlexBox>
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
export default ItemForm;
