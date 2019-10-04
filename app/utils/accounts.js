import React from 'react';
import { Strings, Account, IconList, Themes } from '../constants';
import moment from 'moment';
import 'moment/locale/ta';

const catIcon = IconList.iconList;

const dateFormat = {
	month : 'MMMM',
	dateMonthShort: 'DD MMM',
	dateShort: 'DD',
	monthYear: 'MM YYYY',
	transaction : 'ddd, DD MMM, YYYY',
	save : 'YYYY-MM-DD',
	transactionTime : 'ddd, DD MMM, YYYY | hh:mm A'
}

const groupAccType = (accounts,type,isArray) => {
	if(!accounts) return;
	accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);
	let obj = {};
	accounts.map(function(acc) {
		if(acc.type==type){
			obj[acc.id] = acc;
		}
		});
	return isArray ? Object.values(obj) : obj;
}

const getAccSum = (accounts,type) => {
	// console.log("accounts", accounts);
	if(!accounts) return;
	accounts = Array.isArray(accounts) ? accounts : Object.values(accounts);
	let accs = accounts.filter((acc) => (acc.act && acc.type==type) || (acc.act && type==-1));
	let total = accs.reduce(function(prev, cur) {
		  return prev + parseFloat(cur.bal);
		}, 0);
	return total.toLocaleString();
}

const getBillSum = (bills,type) => {
	// console.log("accounts", accounts);
	// type (0->all,1->paid,2->not paid)
	if(!bills) return;
	bills = Array.isArray(bills) ? bills : Object.values(bills);
	let accs = type ? bills.filter((bill) => (bill.paid && type==1) || (!bill.paid && type==2)) : bills;
	let total = accs.reduce(function(prev, cur) {
		  return prev + parseFloat(cur.amount);
		}, 0);
	return {sum:total.toLocaleString(),count:accs.length};
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

const getTopSpendAreas = ({transactions={},year=moment().format('YYYY'),month=moment().format('MM')})=>{
	let startDate = moment([year, month - 1]);
	let start = startDate.startOf('month').unix(),
	end = moment(startDate).endOf('month').unix(),
	cat={}, trans={};
	for(let i in transactions){
		trans = transactions[i];
		if(i>=start && i<=end && trans.type==0){
			if(!cat.hasOwnProperty(trans.cat)){
				cat[trans.cat] = {amount : 0, cat: trans.cat};
			}
			cat[trans.cat].amount = cat[trans.cat].amount + parseInt(trans.amount);
		}
	}
	return cat;
}

const topSpendGraph = (topSpend,language,totalSpend)=>{
	let cat = [];
	for(let s in topSpend){
		let color = topSpend[s].cat ? catIcon[topSpend[s].cat].color : Theme.colors.accent;
		cat.push({value: ((topSpend[s].amount/totalSpend)*100).toFixed(2), label: language[topSpend[s].cat], color: color });
	}
	return cat;
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

function getCurrentBillMonth(){
	let form = dateFormat['monthYear'];
	return moment().format(form).replace(/ /g, "_");
}

function getDaysLeft() {
	let a = moment().endOf('month');
	let b = moment();
	return a.diff(b, 'days');
}

function getBillDaysLeft(date) {
	let a = moment(date);
	let b = moment();
	return a.diff(b, 'days');
}

export {
	groupAccType,
	getAccSum,
	getCurrentMonthTotalSpend,
	getTopSpendAreas,
	topSpendGraph,
	getCurrentBillMonth,
	getBillSum,

	formatDate,
	getDaysLeft,
	getBillDaysLeft,
};