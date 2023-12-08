import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import MainLayout from "components/layouts/MainLayout";
import ItemIntro from "components/items/ItemIntro";
import ItemDescription from "components/items/ItemDescription";
import api from "../../../shared/api/items";
import { Notes, Message, VolunteerActivism } from "@mui/icons-material";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

const ItemDetails = (props) => {
  const { item } = props;
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_, value) => setSelectedOption(value);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <MainLayout>
      <Container
        sx={{
          my: 4,
        }}
      >
        {item ? <ItemIntro item={item} /> : <H2>Loading...</H2>}

        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab
            className="inner-tab"
            label={
              <Box>
                <Notes fontSize="small" />
                &nbsp; Описание
              </Box>
            }
          />
          <Tab
            className="inner-tab"
            label={
              <Box>
                <VolunteerActivism fontSize="small" />
                &nbsp; Кауза
              </Box>
            }
          />
          <Tab
            className="inner-tab"
            label={
              <Box>
                <Message fontSize="small" />
                &nbsp; Коментари
              </Box>
            }
          />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && <ItemDescription item={item} />}
          {selectedOption === 1 && <ItemDescription item={item} />}
          {selectedOption === 2 && <span>test</span>}
        </Box>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const item = await api.getItemByID(id);

  return {
    props: {
      item,
    },
  };
};

export default ItemDetails;
