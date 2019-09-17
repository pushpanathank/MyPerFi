import React, { Component, memo } from "react";
import { ImageBackground, View, Image } from 'react-native';
import { connect } from "react-redux";
import {
  Container,
  Content,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';
import { Layout, Colors, ActionTypes } from '../constants';
import { getLanguage } from '../utils/common';
import Text from './Text';
import Icon from './Icon';


const appIntro = class AppIntro extends Component {
  constructor(props) {
    super(props);

    const { language } = this.props;
    this.slides = [
      {
        key: 'slide1',
        title: language.slide1Title,
        text: language.slide1Text,
        image: imgs.intro01,
      },
      {
        key: 'slide2',
        title: language.slide2Title,
        text: language.slide2Text,
        image: imgs.intro02,
      },
      {
        key: 'slide3',
        title: language.slide3Title,
        text: language.slide3Text,
        image: imgs.intro03,
      }
    ];
  }
  renderItem = ({ item }) => {
    return (
      <View style={[appStyles.slide,appStyles.rowXYcenter,{padding:Layout.indent}]}>
        <Text style={appStyles.slideTitle}>{item.title}</Text>
        <Image source={item.image} style={appStyles.slideImage} resizeMode="contain"/>
        <Text style={appStyles.slideText}>{item.text}</Text>
      </View>
    );
  }
  onDone = () => {
    this.props.hideIntro();
  }
  renderNextButton = () => {
    return (
      <View style={appStyles.buttonCircle}>
        <Icon
          name="arrow_right"
          size={20}
          style={appStyles.slideIcon}
        />
      </View>
    );
  };
  renderDoneButton = () => {
    return (
      <View style={appStyles.buttonCircle}>
        <Icon
          name="tick"
          size={20}
          style={appStyles.slideIcon}
        />
      </View>
    );
  };
  render() {
    return <AppIntroSlider 
      renderItem={this.renderItem} 
      slides={this.slides} 
      onDone={this.onDone}
      renderDoneButton={this.renderDoneButton}
      renderNextButton={this.renderNextButton}
      activeDotStyle={appStyles.activeDotStyle}
      />;
  }
}

const mapStateToProps = (state) => {
  return {
    language: getLanguage(state.settings.languageId),
    showIntro: state.auth.showIntro
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      hideIntro: () => dispatch({ type: ActionTypes.SHOWINTRO, showIntro: false })
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(memo(appIntro));