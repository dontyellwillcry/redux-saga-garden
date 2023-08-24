import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { takeLatest, put } from "redux-saga/effects";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield takeLatest("FETCH_PLANTS", fetchPlant);
  yield takeLatest("ADD_PLANT", updatePlants);
  yield takeLatest("DELETE_PLANT", removePlant);
}

function* fetchPlant(action) {
  console.log("here is the payload")
  try {
    const plantResponse = yield axios.get("/plant");
    yield put({ type: "SET_PLANT", payload: plantResponse.data });
    console.log("here is the payload", plantResponse.data)
  } catch (error) {
    console.log("Error fetching basket", error);
  }
}

// This is my saga/POST
function* updatePlants(action) {
  try {
    // Using 'yield' to wait for the POST request to complete
    yield axios.post("/plant", action.payload);
    // Dispatching an action to fetch the latest elements list
    yield put({ type: "FETCH_PLANTS" });
  } catch (error) {
    console.log("error posting a basket", error);
  }
}




const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANT':
      return action.payload // WTF when does this need to be a spread and when not??
    default:
      return state;
  }
};

function* removePlant(action) {
  try {
    yield axios.delete(`/plant/${action.payload}`);
    yield put({ type: "FETCH_PLANTS" });
  } catch (error) {
    console.log("error posting a basket", error);
  }
}





const store = createStore(
  combineReducers({ 
    plantList,
  }),
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);