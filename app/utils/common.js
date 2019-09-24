import React from 'react';
import { Toast, Icon } from 'native-base';
import { Strings, Account } from '../constants';
import moment from 'moment';

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
		return moment(date).unix() + Math.floor(moment.duration(moment().diff(moment().format('YYYY-MM-DD'))).asSeconds());
	}
	return moment().unix();
}

const getObjectNValues = ({obj, n=0, sort=0, ret=1})=> {
	if(!obj) return;
	let arr = sort== 0 ? Object.keys(obj).sort(function ( a, b ) { return b - a; }): Object.keys(obj).sort(function ( a, b ) { return a - b; });
	arr = n ? arr.slice(0, n) : arr;
  let result = arr
    .reduce(function(memo, current) { 
      memo[current] = obj[current]
      return memo;
    }, {});
    let prepareRes = ret ? Object.values(result) : result;
    return ret && sort ==-1 ? prepareRes.reverse(): prepareRes;
}

export {
	getLanguage,
	getCurrencySymbol,
	showToast,
	getCurrentRoute,
	getFontIcon,
	generateUUID,
	generateUUIDInt,
	getObjectNValues
};