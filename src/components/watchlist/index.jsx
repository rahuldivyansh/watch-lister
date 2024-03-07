import React from "react";

const WatchListComp = () => {
  return <div>WatchList</div>;
};

// export const getStaticProps = async () => {
//   try {
//     const res = await fetch("/api/watchlist", {
//       method: "POST",
//       headers: {},
//       body: JSON.stringify({
//         email,
//         movieDetails,
//       }),
//     });
//     return {
//       props: {
//         data: results,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// };

export default WatchListComp;
