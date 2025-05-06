import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const AnimeCard = ({ id, image, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 225,
        height: 330,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 260,
            width: "100%",
            objectFit: "cover",
          }}
          image={image}
          alt={title}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2, // show 2 lines max
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AnimeCard;
