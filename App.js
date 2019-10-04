// Imports: Dependencies
import React from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import { Font, AppLoading } from 'expo';
// import * as Font from 'expo-font';

/*import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';*/
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

import { StyleProvider, Root } from 'native-base';
import getTheme from './app/theme/components';
import material from './app/theme/variables/material';

// Imports: Navigation
import ReduxNavigation from './app/navigation/ReduxNavigation';

// Imports: Redux Persist Persister
import { store, persistor } from './app/store/store';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

// React Native: App
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }

  /*async componentWillMount() {
    await Font.loadAsync({
      // 'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font,
      ...AntDesign.font,
      'icomoon': require('./app/assets/fonts/icomoon.ttf'),
      'Font-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
      'Font-Regular': require('./app/assets/fonts/Montserrat-Regular.ttf'),
      'Font-Semibold': require('./app/assets/fonts/Montserrat-SemiBold.ttf'),
      'Font-Bold': require('./app/assets/fonts/Montserrat-Bold.ttf'),
      'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({isReady: true});
  }*/

 _loadResourcesAsync = async () => {
      return Promise.all([
          Font.loadAsync({
              // ...Ionicons.font,
              // ...FontAwesome.font,
              // ...AntDesign.font,
              'icomoon': require('./app/assets/fonts/icomoon.ttf'),
              'Font-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
              'Font-Regular': require('./app/assets/fonts/Montserrat-Regular.ttf'),
              'Font-Semibold': require('./app/assets/fonts/Montserrat-SemiBold.ttf'),
              'Font-Bold': require('./app/assets/fonts/Montserrat-Bold.ttf'),
              'OpenSans-Regular': require('./app/assets/fonts/OpenSans-Regular.ttf'),
          }),
      ]);
  };

  _handleLoadingError = error => {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(error);
  };

  _handleFinishLoading = () => {
      this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate 
          loading={<AppLoading />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(material)}>
            <Root>
              <ReduxNavigation />
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
};