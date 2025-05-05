import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

const SearchInput = ({ handleQueryChange }) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const value = event.target.value;
    handleQueryChange(value);
  };

  return (
    <TextField
      onChange={handleChange}
      fullWidth
      label="Search"
      color="secondary"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ color: theme.palette.secondary.main }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
