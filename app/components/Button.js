import React, { Component, memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../constants';
import Ripple from './Ripple';

class Button extends Component {
  render() {
    const {
      style,
      block,
      center,
      ripple,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      rippleSize,
      rippleDuration,
      rippleColor,
      rippleOpacity,
      rippleCentered,
      rippleContainerBorderRadius,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      block && styles.block,
      center && styles.center,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    /*if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      )
    }*/
    if(ripple){
      return (
        <Ripple
          style={buttonStyles}
          rippleSize={rippleSize || 0}
          rippleDuration={rippleDuration || 400}
          rippleColor={rippleColor || 'rgb(0, 0, 0)'}
          rippleOpacity={rippleOpacity || 0.3}
          rippleCentered={rippleCentered || false}
          rippleContainerBorderRadius={rippleContainerBorderRadius || 0}
          {...props}
        >
          {children}
        </Ripple>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  startColor: Theme.colors.secondary,
  endColor: Theme.colors.secondaryDark,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: Theme.colors.white,
}

export default memo(Button);

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  button: {
    borderRadius: Theme.sizes.radius,
    height: Theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: Theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  center: {
    alignItems: 'center',
  },
  accent: { backgroundColor: Theme.colors.accent, },
  primary: { backgroundColor: Theme.colors.primary, },
  secondary: { backgroundColor: Theme.colors.secondary, },
  tertiary: { backgroundColor: Theme.colors.tertiary, },
  black: { backgroundColor: Theme.colors.black, },
  white: { backgroundColor: Theme.colors.white, },
  gray: { backgroundColor: Theme.colors.gray, },
  gray2: { backgroundColor: Theme.colors.gray2, },
});