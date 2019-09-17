import React from 'react';
import { Toast, Icon } from 'native-base';
import { Strings, Account } from '../constants';

const showToast = (msg,type) => {
	if(msg=='') return;
	Toast.show({
	    text: msg,
	    buttonText: "Okay",
	    type: type || 'default',
	    duration:4000,
	    position: "top",
	    style:{marginTop:25}
	  });
}
const getCurrentRoute = (state: Object) => {
  const findCurrentRoute = (navState: Object) => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index])
    }
    return navState.routeName
  }
  return findCurrentRoute(state.nav)
}

const getFontIcon = (name,style={},size=12,type='AntDesign') =>{
	return <Icon name={name} fontSize={size} type={type} style={[{color:'#ffffff'},style]} />;
}

const getLanguage = (code) =>{
	return Strings[code||0];
}

const getCurrencySymbol = (code) =>{
	return Account.currencies[code||'inr'];
}

const generateUUID = () =>{
	return Date.now().toString(36) + Math.random().toString(36).substr(3, 4);
}

const generateUUIDInt = (date) =>{
	if(date){
		Math.floor(new Date(date).getTime()/ 1000);
	}
	return Math.floor(new Date().getTime()/ 1000);
}

export {
	getLanguage,
	getCurrencySymbol,
	showToast,
	getCurrentRoute,
	getFontIcon,
	generateUUID,
	generateUUIDInt
};