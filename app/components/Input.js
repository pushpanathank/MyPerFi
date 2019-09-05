import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Icon } from 'expo';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import Svgicon from './Svgicon';
import { Theme } from '../constants';

import appStyles from '../theme/appStyles';

export default class Input extends Component {
  state = {
    borderColor: Theme.colors.black
  }

  renderError() {
    const { error, errorMsg } = this.props;
    if(!error){
      return (<Text accent>{errorMsg}</Text>)
    }
  }

  onFocus() {
    this.setState({
      borderColor: Theme.colors.secondary
    })
  };

  onBlur() {
    this.setState({
      borderColor: Theme.colors.black
    })
  };

  render() {
    const {
      error,
      style,
      leftIcon,
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
      // error && { borderBottomColor: Theme.colors.accent },
      leftIcon && { paddingLeft: Theme.sizes.indent * 3 },
      style,
    ];

    return (
      <Block flex={false} margin={[Theme.sizes.base, 0]}>
        {leftIcon ? <View style={{position:'absolute', padding:Theme.sizes.indent}}>{leftIcon}</View> : <View/>}
        <TextInput
          style={[inputStyles,{borderBottomColor: this.state.borderColor }]}
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