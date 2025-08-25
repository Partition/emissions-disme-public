// src/store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import constantsReducer from './constantsSlice';
import emissionsReducer from './emissionsSlice';
import emissionsResultsReducer from './emissionsResultsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['constants', 'emissions', 'emissionsResults'] // Specify which reducers to persist
};

const rootReducer = combineReducers({
    constants: constantsReducer,
    emissions: emissionsReducer,
    emissionsResults: emissionsResultsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);