import { Box } from "@mui/material";
import * as yup from "yup";
import { ItemForm } from "pages-sections/vendor";
import VendorDashboardLayout from "components/layouts/vendor";
import apiItems from "../../../../shared/api/items";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

CreateItem.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function CreateItem() {
  const router = useRouter();
  const accessToken = useSelector((state) => state.accessToken.value);

  const INITIAL_VALUES = {
    title: "",
    categoryID: 0,
    startingPrice: 0,
    buyNowPrice: 0,
    reservedPrice: 0,
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 7,
      new Date().getHours(),
      new Date().getMinutes()
    ),
    snipingProtection: false,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("задължително"),
    // categoryID: yup.number().integer().min(1).required("задължително"),
    startingPrice: yup.number().min(0.1).required("задължително"),
  });

  const handleFormSubmit = async (values) => {
    console.log("before");
    let success = await apiItems.createItem(values, accessToken);

    console.log("after");
    if (success) {
      router.push(`/vendor/items`);
    } else {
      // Message user that item creation has not been successful
    }
  };

  return (
    <Box py={4}>
      <ItemForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
