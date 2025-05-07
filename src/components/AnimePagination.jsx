import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AnimePagination = ({ handlePageChange, totalPages, page }) => {
  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "flex-end" }}>
      <Pagination
        onChange={handleChange}
        count={totalPages}
        page={page}
        color="secondary"
      />
    </Stack>
  );
};

export default AnimePagination;
