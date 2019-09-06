import React from "react";
import { View } from "react-native";
import { Item, Text, Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Theme } from '../constants';
import { getFontIcon } from '../utils/common';
import Input from './Input';

import appStyles from '../theme/appStyles';

const ReduxInput = ({
  input,
  meta:{ touched, error, warning },
  disabled = false,
  leftIcon = null,
  leftIconStyle={},
  rightIcon = null,
  rightIconStyle={},
  errorStyle={},
  borderColor=Theme.colors.gray2,
  activeBorderColor=Theme.colors.black,
  placeholder="Please Enter",
  placeholderTextColor= Theme.colors.gray2,
  textColor='',
  keyboardType='default',
  autoCapitalize="none",
  autoCompleteType='off',
  maxLength=100,
  numberOfLines=1,
  spellCheck=false,
  autoCorrect=false,
  secureTextEntry=false,
  style={},
}) => {
  let hasError= false;
  if(textColor){
    style['color'] = textColor;
  }
  if(touched && error){
    hasError= true;
  }
  if(disabled){

  }else{
    return(
      <Input
        {...input}
        error={hasError}
        style={style}
        leftIcon={leftIcon}
        leftIconStyle={leftIconStyle}
        rightIcon={rightIcon}
        rightIconStyle={rightIconStyle}
        borderColor={borderColor}
        activeBorderColor={activeBorderColor}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        spellCheck={spellCheck}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        autoComplete={autoCompleteType}
        errorStyle={errorStyle}
        value={input.value}
        />
      )
  }
}
export default ReduxInput;