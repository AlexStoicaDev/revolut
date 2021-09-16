import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { applyMiddleware, createStore, Store } from 'redux';
import { createRootReducer } from './reducer';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { saga } from './sagas';

export default function createAppStore(history: History): Store {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        createRootReducer(history),
        composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
    );
    sagaMiddleware.run(saga);
    return store;
}
