import React, { Component, memo } from 'react';
import { StyleSheet, Text } from 'react-native';

import appStyles from '../../theme/appStyles';
import { Theme } from "../../constants";

class Icon extends Component {

    /**
     * Add icons here.
     * Icomoon tells you the utf code.
     */
    static icons = {
        accounts: '\u{e900}',
        addnote: '\u{e901}',
        airticket: '\u{e902}',
        arrow_down: '\u{e903}',
        arrow_right: '\u{e904}',
        back: '\u{e905}',
        back_arrow: '\u{e906}',
        beauty: '\u{e907}',
        bell: '\u{e908}',
        bike: '\u{e909}',
        bill: '\u{e90a}',
        book: '\u{e90b}',
        breakfast: '\u{e90c}',
        business: '\u{e90d}',
        calendar: '\u{e90e}',
        car: '\u{e90f}',
        card: '\u{e910}',
        categories: '\u{e911}',
        chart: '\u{e912}',
        chicken: '\u{e913}',
        child: '\u{e914}',
        close: '\u{e915}',
        clothes: '\u{e916}',
        coffee: '\u{e917}',
        cookies: '\u{e918}',
        courier: '\u{e919}',
        creditcardpay: '\u{e91a}',
        cycle: '\u{e91b}',
        delete: '\u{e91c}',
        dining: '\u{e91d}',
        dinner: '\u{e91e}',
        donation: '\u{e91f}',
        donation_1: '\u{e920}',
        dress: '\u{e921}',
        drinks: '\u{e922}',
        edit: '\u{e923}',
        education: '\u{e924}',
        electricity: '\u{e925}',
        electronics: '\u{e926}',
        email: '\u{e927}',
        emi: '\u{e928}',
        entertainment: '\u{e929}',
        exclamation: '\u{e92a}',
        fastfood: '\u{e92b}',
        finance: '\u{e92c}',
        flowers: '\u{e92d}',
        fooddrinks: '\u{e92e}',
        fruits: '\u{e92f}',
        games: '\u{e930}',
        gas: '\u{e931}',
        gift: '\u{e932}',
        grocery: '\u{e933}',
        gymfitness: '\u{e934}',
        health: '\u{e935}',
        heart: '\u{e936}',
        home: '\u{e937}',
        hotel: '\u{e938}',
        house: '\u{e939}',
        icecream: '\u{e93a}',
        imps: '\u{e93b}',
        inbox: '\u{e93c}',
        insurance: '\u{e93d}',
        interest: '\u{e93e}',
        investment: '\u{e93f}',
        investmentincome: '\u{e940}',
        jewellery: '\u{e941}',
        job: '\u{e942}',
        loan: '\u{e943}',
        logout: '\u{e944}',
        lunch: '\u{e945}',
        maid: '\u{e946}',
        maintenance: '\u{e947}',
        medical: '\u{e948}',
        menu: '\u{e949}',
        milk: '\u{e94a}',
        minus_filled: '\u{e94b}',
        misc: '\u{e94c}',
        mobile: '\u{e94d}',
        moneytransfer: '\u{e94e}',
        month: '\u{e94f}',
        music: '\u{e950}',
        mutualfund: '\u{e951}',
        others: '\u{e952}',
        password: '\u{e953}',
        pay: '\u{e954}',
        pet: '\u{e955}',
        plus: '\u{e956}',
        plus_filled: '\u{e957}',
        refund: '\u{e958}',
        reimburse: '\u{e959}',
        rent: '\u{e95a}',
        salary: '\u{e95b}',
        saloon: '\u{e95c}',
        savings: '\u{e95d}',
        search: '\u{e95e}',
        settings: '\u{e95f}',
        shape: '\u{e960}',
        share: '\u{e961}',
        shoes: '\u{e962}',
        shop: '\u{e963}',
        shopping: '\u{e964}',
        sort: '\u{e965}',
        spa: '\u{e966}',
        spend: '\u{e967}',
        star: '\u{e968}',
        stationery: '\u{e969}',
        tax: '\u{e96a}',
        taxi: '\u{e96b}',
        telephone: '\u{e96c}',
        tick: '\u{e96d}',
        ticket: '\u{e96e}',
        toy: '\u{e96f}',
        train: '\u{e970}',
        transfer: '\u{e971}',
        travel: '\u{e972}',
        trends: '\u{e973}',
        tv: '\u{e974}',
        up_arrow: '\u{e975}',
        uploadbill: '\u{e976}',
        useravatar: '\u{e977}',
        username: '\u{e978}',
        vacation: '\u{e979}',
        vegtables: '\u{e97a}',
        wallet: '\u{e97b}',
        wallet_1: '\u{e97c}',
        water: '\u{e97d}',
        work: '\u{e97e}',
    };

    static propTypes = () => ({
        icon: PropTypes.oneOf(Object.keys(Icon.icons)).isRequired,
        style: Text.propTypes.style
    });


    render() {
        const { icons, styles } = this.constructor;
        const { name, style, size, color } = this.props;
        const iconStyles = this.safeIconStyle([
	      appStyles.myIcon,
	      size && { fontSize: parseInt(size) },
	      color && { color: color },
	      style // rewrite predefined styles
	    ]);

        return <Text style={iconStyles}>{icons[name]}</Text>
    }

    safeIconStyle(styles) {
        const style = StyleSheet.flatten(styles);

        delete style.fontWeight;

        return style;
    };


}

export default memo(Icon);