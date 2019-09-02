import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { Theme } from '../constants';

export default class Divider extends Component {
  render() {
    const { color, style, ...props } = this.props;
    const dividerStyles = [
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

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    marginVertical: Theme.sizes.indent,
    borderBottomColor: Theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})
