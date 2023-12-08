import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import api from "../../../../shared/api/items";

const SearchInput = () => {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [resultList, setResultList] = useState([]);
  const getItems = async (searchText) => {
    const data = await api.getItems();
    setResultList(data);
  };
  const handleSearch = (e) => {
    startTransition(() => {
      const value = e.target?.value;
      if (!value) setResultList([]);
      else getItems(value);
    });
  };
  const handleDocumentClick = () => setResultList([]);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Потърси в аукциона..."
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "text.dark",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: (
            <Button
              color="primary"
              disableElevation
              variant="contained"
              sx={{
                px: "3rem",
                height: "100%",
                borderRadius: "0 300px 300px 0",
              }}
            >
              Потърси
            </Button>
          ),
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/items/search/${item}`} key={item} passHref>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};
export default SearchInput;
