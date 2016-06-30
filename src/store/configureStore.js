import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import { selectedUsersPage, usersByPage } from '../reducers/users';
import { selectedReposPage, reposByPage, repoTableSize } from '../reducers/repos';
import reduxCrud from 'redux-crud';
import {userReducer, usersPage} from '../reducers/user';
import {reducer as formReducer} from 'redux-form';

const logger = createLogger();
const rootReducer = combineReducers(
    {
        auth,
        selectedUsersPage,
        usersByPage,
        selectedReposPage,
        reposByPage,
        repoTableSize,
        users: userReducer,
        usersPage,
        form: formReducer,

        routing: routerReducer
    }
);

const initialState = {};

export default function configureStore() {
    let store;
    if (module.hot) {
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunkMiddleware, logger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
    } else {
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunkMiddleware), f=>f
        ));
    }

    return store;
}