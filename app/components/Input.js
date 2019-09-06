import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Icon } from 'expo';
import * as Animatable from 'react-native-animatable';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import Svgicon from './Svgicon';
import { Theme } from '../constants';

import appStyles from '../theme/appStyles';

export default class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      borderColor: this.props.borderColor,
    }
  }

  renderError() {
    const { error, errorMessage, errorStyle } = this.props;
    if(!error){
      return (<Animatable.Text animation="wobble" duration={500} useNativeDriver style={[appStyles.inputError,errorStyle]}>{errorMessage}</Animatable.Text>)
    }
  }

  onFocus() {
    this.setState({
      borderColor: this.props.activeBorderColor
    })
  };

  onBlur() {
    this.setState({
      borderColor: this.props.borderColor
    })
  };

  render() {
    const {
      error,
      style,
      leftIcon,
      leftIconStyle,
      rightIcon,
      rightIconStyle,
      placeholder,
      placeholderTextColor,
      keyboardType,
      autoCapitalize,
      maxLength,
      numberOfLines,
      spellCheck,
      autoCorrect,
      secureTextEntry,
      autoComplete,
      value,
      ...props
    } = this.props;

    const inputStyles = [
      appStyles.textbox,
      {borderBottomColor: this.state.borderColor },
      //error && { borderBottomColor: Theme.colors.accent },
      leftIcon && { paddingLeft: Theme.sizes.indent * 3 },
      rightIcon && { paddingRight: Theme.sizes.indent * 3 },
      style,
    ];

    return (
      <Block flex={false} margin={[Theme.sizes.base, 0]}>
        {leftIcon ? <View style={[appStyles.inputLeftIcon, leftIconStyle]}>{leftIcon}</View> : <View/>}
        <TextInput
          style={[inputStyles]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          spellCheck={spellCheck}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          value={value}
          underlineColorAndroid='transparent'

          onFocus={()=>this.onFocus()}
          onBlur={()=>this.onBlur()}

          {...props}
        />
        {rightIcon ? <View style={[appStyles.inputRightIcon, rightIconStyle]}>{rightIcon}</View> : <View/>}
        {this.renderError()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: Theme.sizes.base * 2,
    height: Theme.sizes.base * 2,
    top: Theme.sizes.base,
    right: 0,
  }
});