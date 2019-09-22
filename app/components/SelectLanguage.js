import React from "react";
import { ImageBackground, View, Image } from 'react-native';
import { connect } from "react-redux";
import {
  Container,
  Content,
} from 'native-base';

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';
import { ActionTypes, Theme } from '../constants';
import SetLanguage from './SetLanguage';
import Text from './Text';


class SelectLanguage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={appStyles.container}>
          <ImageBackground 
              source={imgs.languageBg} 
              style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
              <View style={[appStyles.rowXYcenter]}>
                <Text style={[appStyles.slideTitle,{marginBottom:30}]}>Choose your language</Text>
                <SetLanguage btnView={true}/>
              </View>
           </ImageBackground>
        </Container>
      );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);