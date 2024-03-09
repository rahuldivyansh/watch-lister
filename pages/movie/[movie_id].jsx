"use client";
import React, { useMemo, useState } from "react";
import axios from "axios";
import movieInstance from "@/src/services/movie";
import {
  MOVIE_POSTER_BASE_URL,
  singleMovieOptions,
} from "@/src/constants/movie";
import Navbar from "@/src/components/sections/navbar";
import Image from "next/image";
import { imageLoader } from "@/src/utils/image";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import WatchList from "@/src/models/watchlist";
import useFetch from "@/src/hooks/general/useFetch";
import { connectMongoDB } from "@/src/lib/mongodb";

export const getServerSideProps = async (context) => {
  const id = context.query.movie_id;

  singleMovieOptions.url = `/movie/${id}`;
  try {
    const res = await movieInstance(singleMovieOptions);
    const result = await res.data;
    const session = await getToken({
      req: context.req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    let isMovieAdded = false;
    if (session) {
      const email = session?.email;
      const id = result.id;
      await connectMongoDB();
      const getMovieData = await WatchList.findOne({ email, movieId: id });
      if (getMovieData) {
        isMovieAdded = true;
      }
    }
    return {
      props: {
        movie: result,
        isMovieAdded,
        session,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};


export default function Movie(props) {
  const { movie, isMovieAdded } = props;
  const [isAdded, setIsAdded] = useState(isMovieAdded);

  const { data: session } = useSession();
  const email = useMemo(() => session?.user?.email, [session]);
  // console.log("session", session);

  const postData = useFetch({
    method: "POST",
    url: "/api/watchlist/postDetails",
  });

  const deleteData = useFetch({
    method: "DELETE",
    url: "/api/watchlist/deleteDetails",
  });
  

  const handleAdd = async () => {
    try {
      const payload = movie;
      const { data, error } = await postData.dispatch(payload);

      if (!error) {
        console.log("Successfully added to watchlist");
        setIsAdded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    try {
      const payload = movie.id;
      const {data, error} = await deleteData.dispatch(payload);

      if (!error) {
        console.log("Successfully removed from watchlist");
        setIsAdded(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />

      <div className="flex flex-col container mx-auto max-w-4xl p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <Image
              className="rounded flex-1 w-1/2 sm:w-1/3 md:w-full"
              loader={imageLoader}
              src={`${MOVIE_POSTER_BASE_URL}/${movie.poster_path}`}
              width={200}
              height={300}
              loading="lazy"
              style={{ objectFit: "cover" }}
              alt={movie.title}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2 justify-center">
            <p className="text-3xl font-bold">{movie.title}</p>
            <div className="text-sm text-white/50 gap-2 flex items-center">
              <span className="bg-red-600 rounded p-0.5 text-white">
                Rating {movie.vote_average}
              </span>
              <span>&#8226;</span>
              <span className="bg-dark_secondary rounded text-white p-0.5">
                {movie.original_language}
              </span>
            </div>
            <p className="text-sm sm:text-base text-white/80">
              {movie.overview}
            </p>
            <div className="flex items-start gap-2">
              {movie?.genres.map((item) => (
                <p
                  key={item.id}
                  className=" rounded-full bg-dark_secondary/50 border border-dark_secondary p-1 text-sm"
                >
                  {item.name}
                </p>
              ))}
            </div>
            {session && (
              <button
                className="mt-6 bg-red-400/40 rounded p-2 "
                onClick={isAdded ? handleRemove : handleAdd}
              >
                {isAdded ? "Remove from watchlist" : "Add to watchlist"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
