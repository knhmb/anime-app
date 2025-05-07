import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <p>Page not found. Click on the button to go to the home page</p>
      <Button
        onClick={() => navigate("/home", { replace: true })}
        sx={{ marginTop: "1rem" }}
        variant="contained"
        color="secondary"
      >
        Back
      </Button>
    </section>
  );
};

export default NotFound;
