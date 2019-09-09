import React from "react";
import { Text } from 'react-native';
import { connect } from "react-redux";

import appStyles from '../theme/appStyles';
import imgs from '../assets/images';
import { Theme } from '../constants';


class CurrencySymbol extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Text style={[Theme.fonts[this.props.size] || Theme.fonts.header, {fontFamily: 'OpenSans-Regular', color: this.props.color || Theme.colors.black},this.props.style]}>{this.props.currSymbol}</Text>;
  }
}

const mapStateToProps = (state) => {
  return {
    currSymbol: state.settings.currSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySymbol);