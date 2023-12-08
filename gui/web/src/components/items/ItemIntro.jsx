import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Avatar,
  Grid,
  TextField,
  styled,
  InputBase,
  Paper,
  Card,
  CardMedia,
  InputAdornment,
} from "@mui/material";
import { H1, H3 } from "components/Typography";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "utils/lib";
import { Sell, Person, Gavel } from "@mui/icons-material";
import Countdown from "../../components/Countdown";
import CustomCard from "../CustomCard";
import api from "../../../../shared/api/items";
import ItemHistoryViewDialog from "components/items/ItemHistoryViewDialog";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";

const ItemIntro = (props) => {
  const item = props.item;
  let initialDefaultImageName =
    item.images && item.images.length > 0 ? item.images[0].name : "noimage.png";

  const accessToken = useSelector((state) => state.accessToken.value);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [defaultImageSrc, setDefaultImageSrc] = useState(
    process.env.API_BASE_URL + "/items/image/" + initialDefaultImageName
  );
  const toggleHistoryDialog = useCallback(
    () => setOpenHistoryModal((open) => !open),
    []
  );

  const handleImageClick = (ind) => {
    setSelectedImage(ind);
    setDefaultImageSrc(
      process.env.API_BASE_URL + "/items/image/" + item.images[ind].name
    );
  };

  const initialValues = {
    itemId: item.id,
    bidAmount: "",
  };

  const validationSchema = yup.object().shape({
    bidAmount: yup.number().required("Задължително поле"),
  });

  const handleFormSubmit = (values) => {
    let success = async () => await api.bid(values, accessToken);

    if (success) {
      // router.push(same page with success message);
    } else {
      // Message user that item creation has not been successful
    }
  };

  const StyledCustomCard = styled(CustomCard)({
    margin: "auto",
    display: "flex",
    overflow: "hidden",
    borderRadius: 20,
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 250ms ease-in-out",
    ":hover": {
      "& .hover-box": {
        opacity: 1,
      },
    },
  });

  const ContentWrapper = styled(Box)({
    padding: "1rem",
    "& .title, & .categories": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  });

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox justifyContent="center" mb={2}>
            <Card style={{ width: "100%", borderRadius: "20px" }}>
              <CardMedia
                component="img"
                height={400}
                image={defaultImageSrc}
                alt={item.title}
              />
            </Card>
          </FlexBox>
          <H1 mb={2} fontWeight={400} letterSpacing={"0.2em"}>
            {item.title}
          </H1>
          <FlexBox overflow="auto">
            {item.images.map(function (image, key) {
              return (
                <FlexRowCenter
                  key={key}
                  width={64}
                  height={64}
                  minWidth={64}
                  bgcolor="white"
                  border="1px solid"
                  borderRadius="10px"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(key)}
                  mr={"10px"}
                  borderColor={
                    selectedImage === key ? "primary.main" : "text.disabled"
                  }
                >
                  <Avatar
                    src={`${process.env.API_BASE_URL}/items/image/${image.name}`}
                    variant="square"
                    sx={{
                      height: 40,
                    }}
                  />
                </FlexRowCenter>
              );
            })}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <ContentWrapper>
            <StyledCustomCard>
              <Box alignItems="center" mb={2} letterSpacing={"1em"}>
                <Paper
                  sx={{
                    p: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <H3 fontWeight={400} fontSize="30px" color="primary.main">
                    <Countdown endDate={Date.parse(item.endDate)} />
                  </H3>
                </Paper>
              </Box>
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
                    <Grid container spacing={1} sx={{ p: "10px" }}>
                      <Grid
                        item
                        md={1}
                        xs={1}
                        sx={{
                          p: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Gavel color="primary" />
                      </Grid>
                      <Grid item md={8} xs={8}>
                        <InputBase
                          type="number"
                          name="bidAmount"
                          id="bidAmount"
                          value={values.bidAmount}
                          sx={{ width: "100%" }}
                          placeholder="Минимум 11.00лв"
                          onChange={handleChange}
                          error={!!touched.bidAmount && !!errors.bidAmount}
                        />
                      </Grid>
                      <Grid
                        item
                        md={3}
                        xs={3}
                        sx={{
                          p: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                          style={{ borderRadius: 25 }}
                        >
                          Наддай
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </StyledCustomCard>
            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item md={4}>
                <FlexBox mb={2}>
                  <TextField
                    focused
                    style={{ backgroundColor: "#fff" }}
                    id="outlined-basic"
                    label="Текуща цена"
                    variant="outlined"
                    value={currency(item.startingPrice)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Sell
                            sx={{
                              transform: "scaleX(-1)",
                            }}
                            color="primary"
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                    }}
                  />
                </FlexBox>
              </Grid>
              <Grid item md={4}>
                <FlexBox mb={2}>
                  <TextField
                    focused
                    style={{ backgroundColor: "#fff" }}
                    id="outlined-basic"
                    variant="outlined"
                    label={"Начална цена"}
                    value={currency(item.startingPrice)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Sell
                            sx={{
                              transform: "scaleX(-1)",
                            }}
                            color="primary"
                          />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                    }}
                  />
                </FlexBox>
              </Grid>
              <Grid item md={3}>
                <FlexBox mb={2}>
                  <TextField
                    focused
                    style={{ backgroundColor: "#fff" }}
                    id="outlined-basic"
                    variant="outlined"
                    label={"Брой наддавания"}
                    value={item.history.length}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Gavel color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                    }}
                  />
                </FlexBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <FlexBox mb={2}>
                  <TextField
                    focused
                    style={{ backgroundColor: "#fff" }}
                    id="outlined-basic"
                    variant="outlined"
                    label={"Потребител"}
                    value={"nikolagsiderov"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                    }}
                  />
                </FlexBox>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    padding: "5px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    borderRadius: 20,
                  }}
                  style={{ textTransform: "none" }}
                  onClick={toggleHistoryDialog}
                >
                  История на аукциона
                </Button>
              </Grid>
            </Grid>
            <ItemHistoryViewDialog
              openDialog={openHistoryModal}
              handleCloseDialog={toggleHistoryDialog}
              history={item.history}
            />
          </ContentWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ItemIntro;
