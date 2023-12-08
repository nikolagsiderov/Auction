import Link from "next/link";
import { useState } from "react";
import {
  Favorite,
  FavoriteBorder,
  Sell,
  Gavel,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  styled,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import CustomCard from "components/CustomCard";
import { H3, Span } from "components/Typography";
import { FlexBox } from "../flex-box";
import { currency } from "utils/lib";
import Countdown from "../Countdown";

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

const ImageWrapper = styled(Box)(({ theme }) => ({
  height: 200,
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});
const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: "7px",
  opacity: 0,
  right: "15px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
});
const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const ItemCard = (props) => {
  const item = props.item;
  let initialDefaultImageName =
    item.images && item.images.length > 0
      ? item.images[0].name
      : process.env.NO_IMG;
  let defaultImageSrc =
    process.env.API_BASE_URL + "/items/image/" + initialDefaultImageName;

  const [isFavorite, setIsFavorite] = useState(false);
  const toggleIsFavorite = () => {
    setIsFavorite((fav) => !fav);
  };

  return (
    <StyledCustomCard hoverEffect={true}>
      <ImageWrapper>
        <HoverIconWrapper className="hover-box">
          <IconButton
            sx={{
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={toggleIsFavorite}
          >
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
          </IconButton>
        </HoverIconWrapper>
        <StyledChip
          color="primary"
          size="small"
          label={
            <FlexBox>
              <TrendingUp fontSize="small" /> <span>&nbsp;</span>
              <Span fontSize={"13px"}>{item.history.length}</Span>
            </FlexBox>
          }
        />

        <Link href={`/items/${item.id}`}>
          <a>
            <Card
              style={{
                width: "100%",
                borderRadiusTop: "20px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <CardMedia
                component="img"
                height={200}
                image={defaultImageSrc}
                alt={item.title}
              />
            </Card>
          </a>
        </Link>
      </ImageWrapper>

      <ContentWrapper>
        <Link href={`/items/${item.id}`}>
          <a>
            <H3
              mb={1}
              title={item.title}
              fontSize="20px"
              fontWeight="700"
              className="title"
              color="text.secondary"
            >
              {item.title}
            </H3>
          </a>
        </Link>
        <Grid container width={"100%"}>
          <Grid
            item
            md={12}
            xs={12}
            container
            fontSize="15px"
            fontWeight={400}
            color="primary.main"
            letterSpacing={"0.4em"}
          >
            <Span>
              <Countdown endDate={Date.parse(item.endDate)} />
            </Span>
          </Grid>
        </Grid>
      </ContentWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Span color="text.dark" mb={1} display="block">
              {item.description && item.description.length > 51
                ? item.description.substring(0, 50) + "..."
                : item.description}
            </Span>
          </Box>

          <FlexBox
            alignItems="center"
            flexDirection="column-reverse"
            justifyContent={"flex-start"}
          >
            <Link href={`/items/${item.id}`}>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  padding: "5px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: 20,
                }}
              >
                Разгледай
              </Button>
            </Link>
            <br />
            <Box fontWeight="600" color="primary.main">
              <Sell
                sx={{
                  transform: "scaleX(-1)",
                }}
              />{" "}
              <span>&nbsp;</span> {currency(item.startingPrice)}
              <br />
              <Gavel /> <span>&nbsp;</span> {currency(item.buyNowPrice)}
            </Box>
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledCustomCard>
  );
};

export default ItemCard;
