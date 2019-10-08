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
        education: '\u{e923}',
        electricity: '\u{e924}',
        electronics: '\u{e925}',
        email: '\u{e926}',
        emi: '\u{e927}',
        entertainment: '\u{e928}',
        exclamation: '\u{e929}',
        fastfood: '\u{e92a}',
        finance: '\u{e92b}',
        flowers: '\u{e92c}',
        fooddrinks: '\u{e92d}',
        fruits: '\u{e92e}',
        games: '\u{e92f}',
        gas: '\u{e930}',
        gift: '\u{e931}',
        grocery: '\u{e932}',
        gymfitness: '\u{e933}',
        health: '\u{e934}',
        heart: '\u{e935}',
        home: '\u{e936}',
        hotel: '\u{e937}',
        house: '\u{e938}',
        icecream: '\u{e939}',
        imps: '\u{e93a}',
        inbox: '\u{e93b}',
        insurance: '\u{e93c}',
        interest: '\u{e93d}',
        investment: '\u{e93e}',
        investmentincome: '\u{e93f}',
        jewellery: '\u{e940}',
        job: '\u{e941}',
        loan: '\u{e942}',
        logout: '\u{e943}',
        lunch: '\u{e944}',
        maid: '\u{e945}',
        maintenance: '\u{e946}',
        medical: '\u{e947}',
        menu: '\u{e948}',
        milk: '\u{e949}',
        misc: '\u{e94a}',
        mobile: '\u{e94b}',
        moneytransfer: '\u{e94c}',
        month: '\u{e94d}',
        music: '\u{e94e}',
        mutualfund: '\u{e94f}',
        others: '\u{e950}',
        password: '\u{e951}',
        pay: '\u{e952}',
        pet: '\u{e953}',
        plus: '\u{e954}',
        refund: '\u{e955}',
        reimburse: '\u{e956}',
        rent: '\u{e957}',
        salary: '\u{e958}',
        saloon: '\u{e959}',
        savings: '\u{e95a}',
        search: '\u{e95b}',
        settings: '\u{e95c}',
        shape: '\u{e95d}',
        share: '\u{e95e}',
        shoes: '\u{e95f}',
        shop: '\u{e960}',
        shopping: '\u{e961}',
        spa: '\u{e962}',
        spend: '\u{e963}',
        star: '\u{e964}',
        stationery: '\u{e965}',
        tax: '\u{e966}',
        taxi: '\u{e967}',
        telephone: '\u{e968}',
        tick: '\u{e969}',
        ticket: '\u{e96a}',
        toy: '\u{e96b}',
        train: '\u{e96c}',
        transfer: '\u{e96d}',
        travel: '\u{e96e}',
        trends: '\u{e96f}',
        tv: '\u{e970}',
        up_arrow: '\u{e971}',
        uploadbill: '\u{e972}',
        useravatar: '\u{e973}',
        username: '\u{e974}',
        vacation: '\u{e975}',
        vegtables: '\u{e976}',
        wallet: '\u{e977}',
        wallet_1: '\u{e978}',
        water: '\u{e979}',
        work: '\u{e97a}',
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