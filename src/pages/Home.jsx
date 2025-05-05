import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import AnimeCard from "../components/AnimeCard";
import AnimePagination from "../components/AnimePagination";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const fetchAnimes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=10&page=${page}`
      );
      if (!response.ok)
        throw new Error("Data Fetching has failed. Please try again later.");
      const data = await response.json();
      setAnimes(data.data);
      setTotalPages(data.pagination.items.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectPage = (pageNum) => {
    setPage(pageNum);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    fetchAnimes();
  }, [page, debouncedQuery]);

  return (
    <>
      <SearchInput handleQueryChange={handleQueryChange} />
      {loading && <LoadingSpinner />}
      {!loading && animes.length > 0 && (
        <div className="card-content">
          {animes?.map((anime) => {
            return (
              <AnimeCard
                key={anime.mal_id}
                image={anime.images.jpg.image_url}
                title={anime.title}
              />
            );
          })}
        </div>
      )}
      {!loading && animes.length === 0 && <EmptyState />}
      {!loading && (
        <AnimePagination
          handlePageChange={selectPage}
          totalPages={totalPages}
          page={page}
        />
      )}
    </>
  );
};

export default Home;
