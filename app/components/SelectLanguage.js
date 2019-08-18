import React from "react";
import { ImageBackground, View, Image } from 'react-native';
import { connect } from "react-redux";
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
import { Colors, ActionTypes } from '../constants';
import SetLanguage from './SetLanguage';


class SelectLanguage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[appStyles.rowXYcenter,{backgroundColor: Colors.primary}]}>
        <Text style={[appStyles.slideTitle,{marginBottom:30}]}>Choose your language</Text>
        <SetLanguage btnView={true}/>
      </View>
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