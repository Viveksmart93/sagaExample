import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleWare from 'redux-saga';
import {rootReducer} from './reducer';
import rootSaga from './saga'; 

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store };