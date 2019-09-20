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
        categories: '\u{e910}',
        chart: '\u{e911}',
        chicken: '\u{e912}',
        child: '\u{e913}',
        close: '\u{e914}',
        clothes: '\u{e915}',
        coffee: '\u{e916}',
        cookies: '\u{e917}',
        courier: '\u{e918}',
        cycle: '\u{e919}',
        delete: '\u{e90f}',
        dining: '\u{e91a}',
        dinner: '\u{e91b}',
        donation: '\u{e91c}',
        donation_1: '\u{e91d}',
        drinks: '\u{e91e}',
        education: '\u{e91f}',
        electricity: '\u{e920}',
        electronics: '\u{e921}',
        email: '\u{e922}',
        emi: '\u{e923}',
        entertainment: '\u{e924}',
        exclamation: '\u{e925}',
        fastfood: '\u{e926}',
        finance: '\u{e927}',
        flowers: '\u{e928}',
        fooddrinks: '\u{e929}',
        fruits: '\u{e92a}',
        games: '\u{e92b}',
        gas: '\u{e92c}',
        gift: '\u{e92d}',
        grocery: '\u{e92e}',
        gymfitness: '\u{e92f}',
        health: '\u{e930}',
        heart: '\u{e931}',
        home: '\u{e932}',
        hotel: '\u{e933}',
        house: '\u{e934}',
        icecream: '\u{e935}',
        imps: '\u{e936}',
        inbox: '\u{e937}',
        insurance: '\u{e938}',
        interest: '\u{e939}',
        investment: '\u{e93a}',
        investmentincome: '\u{e93b}',
        jewellery: '\u{e93c}',
        job: '\u{e93d}',
        loan: '\u{e93e}',
        logout: '\u{e93f}',
        lunch: '\u{e940}',
        maid: '\u{e941}',
        maintenance: '\u{e942}',
        medical: '\u{e943}',
        menu: '\u{e944}',
        milk: '\u{e945}',
        misc: '\u{e946}',
        mobile: '\u{e947}',
        moneytransfer: '\u{e948}',
        month: '\u{e949}',
        music: '\u{e94a}',
        mutualfund: '\u{e94b}',
        others: '\u{e94c}',
        password: '\u{e94d}',
        pay: '\u{e94e}',
        pet: '\u{e94f}',
        plus: '\u{e950}',
        refund: '\u{e951}',
        reimburse: '\u{e952}',
        rent: '\u{e953}',
        salary: '\u{e954}',
        saloon: '\u{e955}',
        savings: '\u{e956}',
        search: '\u{e957}',
        settings: '\u{e958}',
        shape: '\u{e959}',
        share: '\u{e95a}',
        shoes: '\u{e95b}',
        shop: '\u{e95c}',
        shopping: '\u{e95d}',
        spa: '\u{e95e}',
        spend: '\u{e95f}',
        star: '\u{e960}',
        stationery: '\u{e961}',
        tax: '\u{e962}',
        taxi: '\u{e963}',
        telephone: '\u{e964}',
        tick: '\u{e965}',
        ticket: '\u{e966}',
        toy: '\u{e967}',
        train: '\u{e968}',
        transfer: '\u{e969}',
        travel: '\u{e96a}',
        trends: '\u{e96b}',
        tv: '\u{e96c}',
        up_arrow: '\u{e96d}',
        uploadbill: '\u{e96e}',
        useravatar: '\u{e96f}',
        username: '\u{e970}',
        vacation: '\u{e971}',
        vegtables: '\u{e972}',
        wallet: '\u{e973}',
        wallet_1: '\u{e974}',
        water: '\u{e975}',
        work: '\u{e976}',
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