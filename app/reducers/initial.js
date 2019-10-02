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
		languageSet:0,
		budget:0
	},
	accounts:{
		items: {},
	},
	transactions:{
		items:{},
	},
	bills:{
		items:{}
	}
};