import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import loginSlice from '../features/login/loginSlice';
import RegisterSlice from '../features/register/RegisterSlice';
import ResetSlice from '../features/reset/ResetSlice';
import spaceSlice from '../features/space/spaceSlice';

// persistConfig setup
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine your reducers (replace with actual reducers)
const rootReducer = combineReducers({
  login: loginSlice,
  register: RegisterSlice,
  reset: ResetSlice,
  spaceId: spaceSlice,
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
