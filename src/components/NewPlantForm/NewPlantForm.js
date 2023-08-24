import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
  const dispatch = useDispatch();

  // Individual state values for each form field
  const [name, setName] = useState('');
  const [kingdom, setKingdom] = useState('');
  const [clade, setClade] = useState('');
  const [order, setOrder] = useState('');
  const [family, setFamily] = useState('');
  const [subfamily, setSubfamily] = useState('');
  const [genus, setGenus] = useState('');

  const addNewPlant = event => {
    event.preventDefault();
    const newPlant = {
      name,
      kingdom,
      clade,
      order,
      family,
      subfamily,
      genus
    };
    dispatch({ type: 'ADD_PLANT', payload: newPlant });
    setName('')
    setKingdom('')
    setClade('')
    setOrder('')
    setFamily('')
    setSubfamily('')
    setGenus('')
  };

  return (
    <div>
      <h3>Plant form</h3>
      <form onSubmit={addNewPlant}>
        <input type='text' value={name} onChange={event  => setName(event.target.value)} />
        <input type='text' value={kingdom} onChange={event => setKingdom(event.target.value)} />
        <input type='text' value={clade} onChange={event => setClade(event.target.value)} />
        <input type='text' value={order} onChange={event => setOrder(event.target.value)} />
        <input type='text' value={family} onChange={event => setFamily(event.target.value)} />
        <input type='text' value={subfamily} onChange={event => setSubfamily(event.target.value)} />
        <input type='text' value={genus} onChange={event => setGenus(event.target.value)} />

        <input type='submit' value='Add New Plant' />
      </form>
    </div>
  );
};

export default NewPlantForm;
