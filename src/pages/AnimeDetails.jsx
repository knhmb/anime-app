import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import LoadingSpinner from "../components/loading/LoadingSpinner";

const AnimeDetails = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const fetchAnimeDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}`
      );
      if (!response.ok)
        throw new Error("Data Fetching has failed. Please try again later.");
      const data = await response.json();
      setAnimeData(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => num?.toLocaleString();

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, []);

  return (
    <section>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <div className="anime-details-container">
            <img src={animeData?.images?.jpg?.image_url} />
            <div>
              <h3>Synopsis</h3>
              <p>{animeData?.synopsis}</p>
              <div className="card-container">
                <div className="card">
                  <h2>{animeData?.score}</h2>
                  <p>{formatNumber(animeData?.scored_by)} Users</p>
                </div>
                <div className="card">
                  <h2>#{animeData?.rank}</h2>
                  <p>Ranked</p>
                </div>
                <div className="card">
                  <h2>#{animeData?.popularity}</h2>
                  <p>Popularity</p>
                </div>
                <div className="card">
                  <h2>{formatNumber(animeData?.members)}</h2>
                  <p>Members</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleBack}
            sx={{ marginTop: "1.5rem" }}
            variant="contained"
            color="secondary"
            startIcon={<ChevronLeft />}
          >
            Back
          </Button>
        </>
      )}
    </section>
  );
};

export default AnimeDetails;
