import { getLanguage, getCurrencySymbol } from '../utils/common';
export const initialState = {
	common:{
		isLoading: false,
		showModal: false,
	},
	auth:{
		user: null,
		showIntro: true,
	},
	settings:{
		currency: 'inr',
		currSymbol: getCurrencySymbol('inr'),
		languageId:0,
		languageCode:'en',
		languageSet:0
	},
	accounts:{
		bankAcc: {},
		bankAccSum: 0,
		walletAcc: {},
		walletAccSum: 0,
	},
	transactions:{}
};