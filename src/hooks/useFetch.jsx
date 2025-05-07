import { useState, useEffect } from "react";

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Data fetching failed. Please try again later.");
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
