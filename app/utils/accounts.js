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

const getCurrentMonthTotalSpend = (transactions)=>{
	let start = moment().startOf('month').unix(),
	end = moment().endOf('month').unix(), sum=0;
	for(let i in transactions){
		if(i>=start && i<=end && transactions[i].type==0){
			sum = sum+parseInt(transactions[i].amount);
		}
	}
	return sum;
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

function getDaysLeft() {
	let a = moment().endOf('month');
	let b = moment();
	return a.diff(b, 'days');
}

export {
	getAccSum,
	getCurrentMonthTotalSpend,

	formatDate,
	getDaysLeft,
};