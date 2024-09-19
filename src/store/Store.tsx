import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import loginSlice from '../features/login/loginSlice';

// persistConfig setup
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'], // Add the slices you want to persist
};

// Combine your reducers (replace with actual reducers)
const rootReducer = combineReducers({
  login: loginSlice, // Example login slice reducer
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
        ignoredPaths: ['some.path.to.ignore'], // Adjust paths if needed
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
