import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Contexts
import { useTMDB } from "../../../context/Tmdb.context";
import { useGlobal } from "../../../context/Global.context";

// Components
import Loading from "../../layout/standalone/Loading";
import Movies from "../../layout/Movies/Movies";
import SearchPageTabs from "./SearchPageTabs";

function SearchResults() {
  const { query } = useGlobal().info;
  const { getTrendingMovies, getSearchedMovies } = useTMDB().API;
  const [page, setPage] = useState(1);
  const { isPending, isError, data, error } = useQuery({
    queryKey: query
      ? ["SEARCH_MOVIES:" + query, query, page]
      : ["TRENDING_MOVIES", null, page],
    queryFn: ({ queryKey }) => {
      const queryTerm = queryKey[1];
      const pageNum = queryKey[2];
      if (queryTerm) {
        return getSearchedMovies(queryTerm, pageNum);
      } else {
        return getTrendingMovies(pageNum);
      }
    },
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  const totalPages = data.total_pages;
  return (
    <div className="search-results">
      <h1 className="search-results__title">
        {query ? `Results for "${query}"` : "Trending Movies"}
      </h1>
      <Movies movies={data.results} />
      <SearchPageTabs
        totalPages={totalPages >= 5 ? 5 : totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default SearchResults;
