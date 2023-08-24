import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';

function PlantList() {
  const dispatch = useDispatch();
  const plantList = useSelector(store => store.plantList);
  

  useEffect(() => {
    console.log('component did mount');
    getPlants(); // Renamed from getFruit to getPlants for clarity
  }, []);

  const getPlants = () => {
    dispatch({ type: "FETCH_PLANTS" });
  };
  console.log(plantList)
  return (
    
    <ul>
    {plantList.map((plant) => (
      <li key={plant.id}>{plant.name}</li>
    ))}
  </ul>
  );
}

export default PlantList;
