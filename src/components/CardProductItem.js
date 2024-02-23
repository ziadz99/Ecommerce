import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CardProductItem({
  shoppingCart,
  addCartItem,
  decItemQuantitiy,
  removeCartItem,
}) {
  // console.log(shoppingCart);
  return (
    <>
      {shoppingCart.map((item, index) => {
        // let acc = 0;
        // acc += item.quantity * item.price;
        // console.log(item);
        // console.log(shoppingCart);
        return (
          <>
            <Card className="mt-2 w-auto" key={index}>
              <CardBody>
                <div className="grid grid-cols-3 grid-rows-1 gap-x-8 gap-y-3">
                  <div className="col-span-3">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {item.Name}
                    </Typography>
                  </div>
                  <img src={item.Image} alt={item.Image}></img>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mb-2  flex items-center"
                  >
                    {item.Price} LE
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="">
                <Button
                  onClick={() =>
                    item.quantity > 1
                      ? decItemQuantitiy(item)
                      : removeCartItem(item)
                  }
                  className="bg-slate-600 mr-2"
                >
                  -
                </Button>
                <Button className="text-black bg-white">{item.quantity}</Button>
                <Button
                  onClick={() => {
                    addCartItem(item);
                  }}
                  className="bg-slate-600 ml-2"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeCartItem(item)}
                  className="bg-red-600 ml-5"
                >
                  X
                </Button>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </>
  );
}
