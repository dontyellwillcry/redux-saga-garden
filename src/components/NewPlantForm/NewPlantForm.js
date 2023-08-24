import React, { useState } from "react";
import { useDispatch } from "react-redux";

const NewPlantForm = () => {
  const dispatch = useDispatch();

  // Individual state values for each form field
  // I tried using one useState with an object of all the keys but didnt have any luck
  // These are the useState function/variables for my input fields
  const [name, setName] = useState("");
  const [kingdom, setKingdom] = useState("");
  const [clade, setClade] = useState("");
  const [order, setOrder] = useState("");
  const [family, setFamily] = useState("");
  const [subfamily, setSubfamily] = useState("");
  const [genus, setGenus] = useState("");

  // addNewPlant function for when the form button is clicked.
  // declares a variable newPlant that holds an Object of shorthand key/value pairs
  // since both key and value have the same name i only need to put one name.
  // (name: name, kingdom: kingdom, ect)
  const addNewPlant = (event) => {
    event.preventDefault();
    const newPlant = {
      name,
      kingdom,
      clade,
      order,
      family,
      subfamily,
      genus,
    };
    // my dispatch to my rootSaga with add plant type and newPlant as a payload.
    dispatch({ type: "ADD_PLANT", payload: newPlant });
    setName("");
    setKingdom("");
    setClade("");
    setOrder("");
    setFamily("");
    setSubfamily("");
    setGenus("");
  };
  // These are all of my inputs for the use to input the names of the items
  // Each input will trigger the set_FUNCTION_NAME and will take in the even.target.value
  // and update each variable with said value.
  return (
    <div>
      <h3>Plant form</h3>
      <form onSubmit={addNewPlant}>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          value={kingdom}
          placeholder="kingdom"
          onChange={(event) => setKingdom(event.target.value)}
        />
        <input
          type="text"
          value={clade}
          placeholder="clade"
          onChange={(event) => setClade(event.target.value)}
        />
        <input
          type="text"
          value={order}
          placeholder="order"
          onChange={(event) => setOrder(event.target.value)}
        />
        <input
          type="text"
          value={family}
          placeholder="family"
          onChange={(event) => setFamily(event.target.value)}
        />
        <input
          type="text"
          value={subfamily}
          placeholder="subfamily"
          onChange={(event) => setSubfamily(event.target.value)}
        />
        <input
          type="text"
          value={genus}
          placeholder="genus"
          onChange={(event) => setGenus(event.target.value)}
        />
        <input type="submit" value="Add New Plant" />
      </form>
    </div>
  );
};

export default NewPlantForm;
