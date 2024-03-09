import useFetch from "@/src/hooks/general/useFetch";
import React, { useEffect, useState } from "react";
import Main from "../sections/main";
import Heading from "../ui/Typography/Heading";
import Navbar from "../sections/navbar";

const WatchListComp = () => {
  const [data, setData] = useState(null);

  const getWatchlist = useFetch({
    method: "GET",
    url: "/api/watchlist/getDetails",
  });

  const getData = async () => {
    try {
      const { data, error } = await getWatchlist.dispatch();

      if (error) {
        throw new Error(error);
      }
      let temp = [];
      let idx = 0;
      data.watchlistData.forEach((item) => {
        temp[idx++] = item.watchlist;
      });
      setData(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <Navbar />
      <Heading>Your Watchlist</Heading>
      {data && (
        <Main data={data} />
      )}
    </>
  );
};

export default WatchListComp;
