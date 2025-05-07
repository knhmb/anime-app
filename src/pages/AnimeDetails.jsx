import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import useFetch from "../hooks/useFetch";

const AnimeDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const {
    data: animeData,
    loading,
    error,
  } = useFetch(`https://api.jikan.moe/v4/anime/${id}`, [id]);

  const formatNumber = (num) => num?.toLocaleString();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section>
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className="anime-details-container">
            <img src={animeData?.data?.images?.jpg?.image_url} />
            <div>
              <h3>Synopsis</h3>
              <p>{animeData?.data?.synopsis}</p>
              <div className="card-container">
                <div className="card">
                  <h2>{animeData?.data?.score}</h2>
                  <p>{formatNumber(animeData?.data?.scored_by)} Users</p>
                </div>
                <div className="card">
                  <h2>#{animeData?.data?.rank}</h2>
                  <p>Ranked</p>
                </div>
                <div className="card">
                  <h2>#{animeData?.data?.popularity}</h2>
                  <p>Popularity</p>
                </div>
                <div className="card">
                  <h2>{formatNumber(animeData?.data?.members)}</h2>
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
