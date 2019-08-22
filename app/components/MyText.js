import React from "react";
import { Text, Image } from 'react-native';
import { connect } from "react-redux";

import { Colors } from '../constants';
import appStyles from '../theme/appStyles';
import imgs from '../assets/images';

class MyText extends React.Component {
  render() {
      return (
          <Text 
          style={[appStyles.myText],{
            fontSize: this.props.size || 15,
            fontFamily: 'Font-'+(this.props.family || 'Regular'),
            color: this.props.color || Colors.lightBlack
          }}
          >{this.props.text}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyText);