import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({

});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('root')
);