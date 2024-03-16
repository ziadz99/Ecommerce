import { Footer } from "./Footer";
import Slideshow from "./Slideshow";
import Body from "./Body";

export const Home = () => {
  return (
    <>
      <div className="">
        <Slideshow />
      </div>
      <div className="flex flex-row ">
        <Body />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};
