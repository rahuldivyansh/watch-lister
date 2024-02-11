import Footer from "@/src/components/sections/footer";
import Main from "@/src/components/sections/main";
import Navbar from "@/src/components/sections/navbar";
import { allMoviesOptions } from "@/src/constants/movie";
import movieInstance from "@/src/services/movie";

export default function Home({ data }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Main data={data} />
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await movieInstance(allMoviesOptions);
    const results = res.data.results;
    return {
      props: {
        data: results,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
