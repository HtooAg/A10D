  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {combineReducers, configureStore} from '@reduxjs/toolkit';
  import {persistReducer, persistStore} from 'redux-persist';
  import loginSlice from '../features/login/loginSlice';
  import RegisterSlice from '../features/register/RegisterSlice';
  import ResetSlice from '../features/reset/ResetSlice';
  import authReducer from '../features/auth/authSlice';
  import { addSpaceId } from '../features/space/space_id';

  // persistConfig setup
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['login'],
  };

  // Combine your reducers (replace with actual reducers)
  const rootReducer = combineReducers({
    login: loginSlice,
    register: RegisterSlice,
    reset: ResetSlice,
    auth: authReducer,
    spaceId: addSpaceId
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
          ignoredPaths: ['login.loginUser'], // Ignore paths where non-serializable data is stored
        },
      }),
  });

  // Create the persistor
  export const persistor = persistStore(store);
