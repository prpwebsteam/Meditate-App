import { combineReducers } from 'redux';
import commonReducer from './commomReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './AuthReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails'],
};

const rootReducers = combineReducers({
  commonReducer: persistReducer(persistConfig, commonReducer),
  auth: authReducer,
});

export default rootReducers;