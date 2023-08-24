import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();
  const plantList = useSelector((store) => store.plantList);

  // useEffect will run getPlants on page load so the DOM always reflects whats in the database
  useEffect(() => {
    getPlants();
  }, []);

  // removeItem will send the plan.id payload to the delete_plant rootSaga
  // ultimately deleteing it from the table.
  const removeItem = (plant) => {
    dispatch({
      type: "DELETE_PLANT",
      payload: plant.id,
    });
  };

  // getPlats will send a dispatch to the fetch_plants rootSaga
  // triggering a GET request via Saga
  const getPlants = () => {
    dispatch({ type: "FETCH_PLANTS" });
  };

  // here i am using the .map method to list each item in the table on the dom
  // and also placing a delete button next to it so it can be removed.
  return (
    <ul>
      {plantList.map((plant) => (
        <li key={plant.id}>
          {plant.name}
          <button onClick={() => removeItem(plant)}>DELETE</button>
        </li>
        
      ))}
    </ul>
  );
}

export default PlantList;
