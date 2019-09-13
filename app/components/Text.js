// just copy this code from the driving repo :)
import React, { Component, memo } from "react";
import { Text, StyleSheet } from "react-native";

import { Theme } from "../constants";

class Typography extends Component {
  render() {
    const {
      h1,
      h2,
      h3,
      h4,
      h5,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      numberOfLines,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props} numberOfLines={numberOfLines||null}>
        {children}
      </Text>
    );
  }
}

export default memo(Typography);

const styles = StyleSheet.create({
  // default style
  text: {
    fontFamily: 'Font-Regular',
    fontSize: Theme.sizes.font,
    color: Theme.colors.black
  },
  // variations
  regular: {
    fontFamily: 'Font-Regular',
  },
  bold: {
    fontFamily: 'Font-Bold',
  },
  semibold: {
    fontFamily: 'Font-Semibold',
  },
  medium: {
    fontFamily: 'Font-Regular',
  },
  light: {
    fontFamily: 'Font-Light',
  },
  // position
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  // colors
  accent: { color: Theme.colors.accent },
  primary: { color: Theme.colors.primary },
  secondary: { color: Theme.colors.secondary },
  tertiary: { color: Theme.colors.tertiary },
  black: { color: Theme.colors.black },
  white: { color: Theme.colors.white },
  gray: { color: Theme.colors.gray },
  gray2: { color: Theme.colors.gray2 },
  // fonts
  h1: Theme.fonts.h1,
  h2: Theme.fonts.h2,
  h3: Theme.fonts.h3,
  h4: Theme.fonts.h4,
  h5: Theme.fonts.h5,
  title: Theme.fonts.title,
  body: Theme.fonts.body,
  caption: Theme.fonts.caption,
  small: Theme.fonts.small
});
