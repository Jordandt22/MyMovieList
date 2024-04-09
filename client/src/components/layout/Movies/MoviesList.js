import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Components
import Loading from "../standalone/Loading";
import Movies from "./Movies";
import SearchPageTabs from "../../pages/Search/SearchPageTabs";
import ErrorPopup from "../standalone/ErrorPopup";

function MovieList(props) {
  const { APIFunction, title, queryName } = props;
  const [page, setPage] = useState(1);
  const { isPending, isError, data, error } = useQuery({
    queryKey: [`${queryName}?PAGE:${page}`, page],
    queryFn: ({ queryKey }) => APIFunction(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [page]);

  if (isPending) {
    return <Loading />;
  }

  if (isError || !data) {
    return <ErrorPopup message={error.message} />;
  }

  const totalPages = data?.total_pages;
  return (
    <div className="movies-page">
      <h1 className="movies-page__title">{title}</h1>
      <Movies movies={data?.results} />
      <SearchPageTabs
        totalPages={totalPages >= 5 ? 5 : totalPages}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default MovieList;
