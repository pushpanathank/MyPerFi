import React from 'react';
import { Toast, Icon } from 'native-base';
import { Strings, Account } from '../constants';
import moment from 'moment';
import 'moment/locale/ta';


const getAccSum = (accounts) => {
	accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);
	let total = accounts.reduce(function(prev, cur) {
		  return prev + parseFloat(cur.bal);
		}, 0);
	return total.toLocaleString();
}

// Date 
const getFullMonth = (lang) =>  {
	moment.locale(lang);
	return moment().format('MMMM');
}
const getDate = (lang) =>  {
	moment.locale(lang);
	return moment().format('ddd, DD MMM, YYYY');
}
const getDateWithTime = (lang) =>  {
	moment.locale(lang);
	return moment().format('ddd, DD MMM, YYYY | hh:mm A');
}

export {
	getAccSum,

	getFullMonth,
	getDate,
	getDateWithTime
};