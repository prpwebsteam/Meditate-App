/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import { Linking } from 'react-native';
const App = () => {

  const navigationRef = useRef();

  const prefix = "meditation://";

  useEffect(() => {
    const handleDeepLink = (event) => {
      let { url } = event;
      if (url) {
        const route = url.replace(/.*?:\/\//g, '');
        const routeName = route.split('/')[0];
        if (routeName) {
          navigationRef.current?.navigate(routeName);
        }
      }
    };

    Linking?.addEventListener('bit.ly', handleDeepLink);

    Linking?.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      Linking?.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
