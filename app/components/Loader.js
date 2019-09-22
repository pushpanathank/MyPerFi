import React, {Component, memo} from "react";
import { ImageBackground, View } from 'react-native';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';   

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';
import { Theme } from '../constants';
import Logo from './Logo';

class Loader extends React.Component {
  render() {
    return (
        <Container style={appStyles.container}>
          <ImageBackground 
              source={imgs.bg} 
              style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
            <Content enableOnAndroid>
              <View style={{flexDirection: 'column', flex:1}}>
                <View style={{flex: 1,height: Theme.sizes.window.height,}}>
                  <View style={appStyles.rowXYcenter}>
                    <Logo style={[appStyles.loaderLogo]} iterationCount={50} duration={1000} />
                    <Spinner color={Theme.colors.secondary} />
                  </View> 
                </View>  
              </View>  
            </Content>
           </ImageBackground>
        </Container>
    );
  }
}

export default  memo(Loader);