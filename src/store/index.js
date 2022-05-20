import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
export const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(sagas);

