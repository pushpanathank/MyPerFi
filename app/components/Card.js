import React, { Component, memo } from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { Theme } from '../constants';

class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      style,
    ];

    return (
      <Block color={color || Theme.colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    )
  }
}

export default memo(Card);

export const styles = StyleSheet.create({
  card: {
    borderRadius: Theme.sizes.radius,
    padding: Theme.sizes.base + 4,
    marginBottom: Theme.sizes.base,
  },
})
