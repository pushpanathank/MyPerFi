import React from 'react';
import { Strings, Account } from '../constants';
import moment from 'moment';
import 'moment/locale/ta';

const dateFormat = {
	month : 'MMMM',
	dateMonthShort: 'DD MMM',
	transaction : 'ddd, DD MMM, YYYY',
	save : 'YYYY-MM-DD',
	transactionTime : 'ddd, DD MMM, YYYY | hh:mm A'
}

const getAccSum = (accounts) => {
	accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);
	let total = accounts.reduce(function(prev, cur) {
		  return prev + parseFloat(cur.bal);
		}, 0);
	return total.toLocaleString();
}

// Date 
function formatDate({lang='en',date=null,format='transaction'}){
	let form = dateFormat[format];
	moment.locale(lang);
	if(date){
		return moment(date).format(form);
	}
	return moment().format(form);
}

export {
	getAccSum,

	formatDate,
};