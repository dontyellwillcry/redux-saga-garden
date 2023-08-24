import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { takeLatest, put } from "redux-saga/effects";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import App from "./App";

//middleware
const sagaMiddleware = createSagaMiddleware();

// This is my rootSaga where all of my gernerator functions live
// There are 3 here. 1 for my GET, 1 for my POST and one for my DELETE
// Each can be triggered by a dispatch that matches the action.type ("FETCH_PLANTS"..ect)
// Once triggered the function will run.
function* rootSaga() {
  yield takeLatest("FETCH_PLANTS", fetchPlant);
  yield takeLatest("ADD_PLANT", updatePlants);
  yield takeLatest("DELETE_PLANT", removePlant);
}

// This is my GET that points to /plant. It will "put" the planResponse.data
// into the reducer that matches "SET_PLANT".
function* fetchPlant(action) {
  try {
    const plantResponse = yield axios.get("/plant");
    yield put({ type: "SET_PLANT", payload: plantResponse.data });
  } catch (error) {
    console.log("Error fetching basket", error);
  }
}

// This is my saga/POST
// the dispatch payload is sent here if the action.type matches.
// we then send the action.payload to the router to be sent off to the database.
// we then "put" the "FETCH_PLANTS" type to trigger the GET again to refresh the dom
// with the payload we sent to the database.
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

// Our delete does much the same. We send the action.payload (should have a plant.id inside)
// to our router and then to the database, deleting that "id" from the table.
// we again call or put our "FETCH_PLANTS" to update the dom.
function* removePlant(action) {
  try {
    yield axios.delete(`/plant/${action.payload}`);
    yield put({ type: "FETCH_PLANTS" });
  } catch (error) {
    console.log("error posting a basket", error);
  }
}

// Here is our redcer that will hold the GET from our database in an array
// to be used wherever its needed.
const plantList = (state = [], action) => {
  switch (action.type) {
    case "SET_PLANT":
      return action.payload; // WTF when does this need to be a spread and when not??
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    plantList,
  }),
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
