import React from "react";
import { Text, Image } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';

class Logo extends React.Component {
  render() {
    if(this.props.header){
      return (
          <Animatable.Image
            animation="fadeIn"
            duration={this.props.duration||500}
            iterationCount={this.props.iterationCount||1}
            {...this.props} 
            style={[appStyles.rowXYcenter,appStyles.headerLogo, this.props.style]}
            source={imgs.logo}
            resizeMode="contain"
          />
      );
    }else{
      return (
          <Animatable.Image
            animation="pulse"
            duration={this.props.duration||2000}
            iterationCount={this.props.iterationCount||1}
            {...this.props} 
            style={[appStyles.rowXYcenter,appStyles.logo, this.props.style]}
            source={imgs.logoonly}
            resizeMode="contain"
          />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Logo);