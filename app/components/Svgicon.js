import React, { Component, memo} from "react";
import { Text, Image } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import SvgIcon from 'react-native-svg-icon';

import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout, Theme } from '../constants';

const svgicon = class Svgicon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <SvgIcon
          width={this.props.width || Theme.sizes.iconSize}
          height={this.props.height || Theme.sizes.iconSize}
          fill={this.props.color || Theme.colors.icon}
          name={this.props.name}
          svgs={svgs}
          style={this.props.style ||{}}
        />
    );
  }
}

export default memo(svgicon);