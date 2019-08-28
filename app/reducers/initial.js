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
		language:getLanguage(0),
		languageId:0,
		languageSet:0
	}
};