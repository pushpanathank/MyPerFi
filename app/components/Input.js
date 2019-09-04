import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Icon } from 'expo';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import Svgicon from './Svgicon';
import { Theme } from '../constants';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  }

  renderLabel() {
    const { label, error } = this.props;

    return (
      <Block flex={false}>
        {label ? <Text gray2={!error} accent={error}>{label}</Text> : null}
      </Block>
    )
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {
          rightLabel ? rightLabel :
            <Icon.Ionicons
              color={Theme.colors.gray}
              size={Theme.sizes.font * 1.35}
              name={!toggleSecure ? "md-eye" : "md-eye-off"}
          />
        }
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const {
      email,
      phone,
      number,
      secure,
      error,
      style,
      leftIcon,
      ...props
    } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && { borderColor: Theme.colors.accent },
      leftIcon && { paddingLeft: Theme.sizes.indent * 3 },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
      <Block flex={false} margin={[Theme.sizes.base, 0]}>
        {leftIcon ? <View style={{position:'absolute', padding:Theme.sizes.indent}}>{leftIcon}</View> : <View/>}
        {/*this.renderLabel()*/}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.black,
    borderRadius: Theme.sizes.radius,
    fontSize: Theme.sizes.font,
    fontWeight: '500',
    color: Theme.colors.black,
    height: Theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: Theme.sizes.base * 2,
    height: Theme.sizes.base * 2,
    top: Theme.sizes.base,
    right: 0,
  }
});