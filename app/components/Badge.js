import React, { Component, memo } from 'react'
import { StyleSheet } from 'react-native'

import Block from './Block';
import { Theme } from '../constants';

const badge = class Badge extends Component {
  render() {
    const { children, style, size, color, ...props } = this.props;

    const badgeStyles = StyleSheet.flatten([
      styles.badge,
      size && {
        height: size,
        width: size,
        borderRadius: size,
      },
      style,
    ]);

    return (
      <Block flex={false} middle center color={color} style={badgeStyles} {...props}>
        {children}
      </Block>
    )
  }
}

export default memo(badge);

const styles = StyleSheet.create({
  badge: {
    height: Theme.sizes.base,
    width: Theme.sizes.base,
    borderRadius: Theme.sizes.border,
  }
})
