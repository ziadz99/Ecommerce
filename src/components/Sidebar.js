import React, { useEffect, useRef, useState } from "react";
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSubCategories } from "../store/thunks/fetchSubCategories";

function Sidebar({ clothes, setFilteredClothes, category }) {
  const dispatch = useDispatch();
  var curUrl = window.location.href;

  const { data, error } = useSelector((state) => state.subCategory);
  // reference for all of the checkboxes you have
  const checkboxesRef = useRef([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchSubCategories(category));
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      setFilteredClothes(() =>
        clothes.filter((item) => item.SubCategory === Number(filter))
      );
    } else {
      setFilteredClothes(clothes);
    }
  }, [filter]);

  // console.log(clothes);

  //on clicking the parent component, it is as if you clicked on the child
  const handleCheckboxClick = (index) => {
    if (checkboxesRef.current[index]) {
      //the child is identified by its reference
      // checkboxesRef.current[index].click();
      handleCheckboxChange({ target: checkboxesRef.current[index] });
    }
  };

  //To explain, when I added the event on the parent, it was no longer on the child, and the child still had its own action and hitbox
  //So, I added the possibility for the action to be triggered by both the parent (through the target), and the child (through the event)
  const handleCheckboxChange = ({ event, target }) => {
    const { name, checked } = target || event.target; //this here it means it will check the target attribute first, if not found then it will check the event.target

    if (!checked) {
      setFilter(name);
    } else {
      setFilter("");
    }
    if (target) target.checked = !checked;
  };

  const handleResetFilters = () => {
    setFilter("");
  };

  const handleWomenButtonClick = () => {
    window.location.href = "http://localhost:3000/products?name=Women";
  };
  const handleMennButtonClick = () => {
    window.location.href = "http://localhost:3000/products?name=Men";
  };

  return (
    <Card className="w-full lg:w-11/12 shadow-2xl shadow-blue-gray-900/5 mb-5 lg:mb-0 md:mr-3">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Category
        </Typography>
      </div>
      <List>
        {data &&
          data.map((element, index) => (
            <ListItem //parent component
              key={element.id}
              onClick={() => handleCheckboxClick(index)} //when this whole component is clicked, will trigger this event
            >
              <input
                type="checkbox"
                name={`${element.id}`}
                checked={filter === `${element.id}`}
                ref={(el) => (checkboxesRef.current[index] = el)}
                onChange={(event) => handleCheckboxChange({ event })}
                className="mr-2"
              />
              {element.name}
            </ListItem>
          ))}
        <ListItem>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={handleResetFilters}
          >
            Reset Filter
          </button>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <div className="mb-2 p-4">
          <Typography variant="h4" color="blue-gray">
            Other Sections
          </Typography>
        </div>
        {curUrl.includes("Men") && (
          <>
            <ListItem onClick={handleWomenButtonClick}>
              <div>
                <button>Women Section</button>
              </div>
            </ListItem>
          </>
        )}
        {curUrl.includes("Women") && (
          <>
            <ListItem>
              <div onClick={handleMennButtonClick}>
                <button>Men Section</button>
              </div>
            </ListItem>
          </>
        )}
      </List>
    </Card>
  );
}

export default Sidebar;
