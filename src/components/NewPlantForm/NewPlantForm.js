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
        <input type='text' value={name} onChange={e => setName(e.target.value)} />
        <input type='text' value={kingdom} onChange={e => setKingdom(e.target.value)} />
        <input type='text' value={clade} onChange={e => setClade(e.target.value)} />
        <input type='text' value={order} onChange={e => setOrder(e.target.value)} />
        <input type='text' value={family} onChange={e => setFamily(e.target.value)} />
        <input type='text' value={subfamily} onChange={e => setSubfamily(e.target.value)} />
        <input type='text' value={genus} onChange={e => setGenus(e.target.value)} />

        <input type='submit' value='Add New Plant' />
      </form>
    </div>
  );
};

export default NewPlantForm;
