import { useEffect, useState } from "react";
import SearchInput from "../components/search/SearchInput";
import AnimeCard from "../components/cards/AnimeCard";
import AnimePagination from "../components/AnimePagination";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import EmptyState from "../components/empty-state/EmptyState";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&limit=10&page=${page}`,
    [debouncedQuery, page]
  );

  const animes = data?.data || [];
  const totalPages = data?.pagination?.last_visible_page || 1;

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  const selectPage = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <>
      <SearchInput handleQueryChange={handleQueryChange} />
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && animes.length > 0 && (
        <div className="card-content">
          {animes.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              id={anime.mal_id}
              image={anime.images.jpg.image_url}
              title={anime.title}
            />
          ))}
        </div>
      )}
      {!loading && !error && animes.length === 0 && <EmptyState />}
      {!loading && animes.length > 0 && (
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
