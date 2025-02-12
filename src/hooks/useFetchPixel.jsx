// useFetchPixel.jsx
import { useState, useEffect } from "react";

export const useFetchPixel = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Reset loading state each time the URL changes

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch the data");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData.pixels); // Set the pixels array from your JSON
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};
