import React from "react";
import axios from "axios";
import Main from "@/src/components/sections/main";
import { searchMoviesOptions } from "@/src/constants/movie";
import movieInstance from "@/src/services/movie";
import Navbar from "@/src/components/sections/navbar";
import Footer from "@/src/components/sections/footer";

export const getServerSideProps = async (context) => {
  const query = context.query.searchQuery;
  searchMoviesOptions.url = `/search/movie?query=${query}`;
  console.log(query);
  try {
    const response = await movieInstance(searchMoviesOptions);
    const list = await response.data.results;
    return {
      props: {
        data: list,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Search({ data }) {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <Main data={data} />
      <Footer/>
    </div>
  );
}
