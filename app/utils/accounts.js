import React from 'react';
import { Toast, Icon } from 'native-base';
import { Strings, Account } from '../constants';
import moment from 'moment';

const getAccSum = (accounts) => {
	accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);
	let total = accounts.reduce(function(prev, cur) {
		  return prev + parseFloat(cur.bal);
		}, 0);
	return total.toLocaleString();
}

// Date 
const fullMonth = moment().format('MMMM').toLocaleLowerCase();

export {
	getAccSum,

	fullMonth,
};