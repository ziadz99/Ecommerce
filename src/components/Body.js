import men from "../men.jpg";
import women from "../women.jpg";
import cash from "../cash.png";
import delivery from "../delivery.png";
import cs from "../cs.png";
import { Link } from "react-router-dom";

function Body() {
  const callouts = [
    {
      name: "Men",
      description: "Discover newest men collection",
      imageSrc: men,
      imageAlt: "",
      href: "/men",
    },
    {
      name: "Women",
      description: "Fashion with style",
      imageSrc: women,
      imageAlt: "",
      href: "/men",
    },
  ];

  return (
    <div>
      <div className="md:flex dark:bg-black">
        <div className="mx-10 py-8 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1">
          <h2 className="text-2xl font-bold text-white mb-5">Collections</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:gird-cols-3 lg:grid-cols-2 gap-4 ">
            {callouts.map((callout) => (
              <Link
                to={`/products?name=${callout.name}`}
                key={callout.name}
                className="group relative"
              >
                <div className="grid-item ">
                  <div className="overflow-hidden">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      class="w-full  hover:opacity-75 transition-transform transform origin-center hover:scale-110 rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white ml-5 mt-2">
                      {callout.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-7 mr-7">
        <div className="flex flex-row gap-x-96 items-center mt-10 mb-10">
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
            <img
              style={{ width: 58, height: 58, marginRight: 12 }}
              src={cash}
              alt="cash"
            ></img>
            <p>Cash On Delivery</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
            <img
              style={{ width: 58, height: 58, marginRight: 12 }}
              src={delivery}
              alt="cash"
            ></img>
            <p>Fast Devliery</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row ">
            <img
              style={{ width: 58, height: 58, marginRight: 12 }}
              src={cs}
              alt="cash"
            ></img>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
              <p className="ml-2">Customer Services</p>
              <p className="">1698</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
