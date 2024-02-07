import { Footer } from "./Footer";
import Slideshow from "./Slideshow";
import Body from "./Body";

export const Home = () => {
  return (
    <>
      <div className="mt-20">
        <Slideshow />
      </div>
      <div className="flex flex-col">
        <Body />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};
