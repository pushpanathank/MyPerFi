import React, { Component, memo } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { Theme } from '../constants';

const divider = class Divider extends Component {
  render() {
    const { color, style, vertical, height, ...props } = this.props;
    const _height = height ? `${height}%` : '100%';
    const dividerStyles = vertical ? [
      styles.verticleDivider,
      {height: _height,top:(100-height)/2},
      style,
    ]:[
      styles.divider,
      style,
    ];

    return (
      <Block
        color={color || Theme.colors.gray2}
        style={dividerStyles}
        {...props}
      />
    )
  }
}

export default memo(divider);

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    marginVertical: Theme.sizes.indent,
    borderBottomColor: Theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  verticleDivider: {
    width: 0,
    flex:0,
    marginHorizontal: Theme.sizes.indent,
    borderLeftColor: Theme.colors.gray2,
    borderLeftWidth: StyleSheet.hairlineWidth,
  }
})
