import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Divider } from "@mui/material";
import { H5, Small } from "./Typography";

const DropZone = ({
  onChange,
  title = "Постави снимка/снимки",
  imageSize = "При използване на 280х280 формат снимките ще бъдат визуализирани най-добре",
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => onChange(acceptedFiles),
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
  });
  return (
    <Box
      py={4}
      px={{
        md: 10,
        xs: 4,
      }}
      display="flex"
      minHeight="200px"
      alignItems="center"
      borderRadius="10px"
      border="1.5px dashed"
      flexDirection="column"
      borderColor="text.light"
      justifyContent="center"
      textAlign="center"
      bgcolor={isDragActive ? "text.dark" : "text.disabled"}
      sx={{
        transition: "all 250ms ease-in-out",
        outline: "none",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb={1} color="text.dark">
        {title}
      </H5>

      <Divider
        sx={{
          "::before, ::after": {
            borderColor: "text.dark",
            width: 70,
          },
        }}
      >
        <Small color="text.dark" px={1}>
          Или
        </Small>
      </Divider>

      <Button
        type="button"
        variant="outlined"
        color="info"
        sx={{
          px: 4,
          my: 4,
        }}
      >
        Избери
      </Button>

      <Small color="text.dark">{imageSize}</Small>
    </Box>
  );
};
export default DropZone;
