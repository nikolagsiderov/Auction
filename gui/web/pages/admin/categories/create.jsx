import { Box } from "@mui/material";
import * as yup from "yup";
import { CategoryForm } from "pages-sections/admin";
import AdminDashboardLayout from "components/layouts/admin";
import api from "../../../../shared/api/categories";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

CreateCategory.getLayout = function getLayout(page) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};

export default function CreateCategory() {
  const router = useRouter();
  const accessToken = useSelector((state) => state.accessToken.value);

  const INITIAL_VALUES = {
    title: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("задължително"),
  });

  const handleFormSubmit = async (values) => {
    let success = await api.createCategory(values, accessToken);

    if (success) {
      router.push(`/admin/categories`);
    } else {
      // Message user that category creation has not been successful
    }
  };

  return (
    <Box py={4}>
      <CategoryForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
