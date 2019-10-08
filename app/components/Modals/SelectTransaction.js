import React, { Component, memo } from "react";
import { FlatList, View } from 'react-native';
import { connect } from "react-redux";
import Modal from 'react-native-modal';

import { getLanguage } from '../../utils/common';
import { getTransactions, formatDate } from '../../utils/accounts';
import appStyles from '../../theme/appStyles';
import imgs from '../../assets/images';
import { Theme, IconList } from '../../constants';
import Ripple from '../Ripple';
import Block from '../Block';
import Text from '../Text';
import Divider from '../Divider';
import Icon from '../Icons/Icon';
import CurrencySymbol from '../CurrencySymbol';

const catIcon = IconList.iconList;

const selectAccount = class SelectAccount extends Component {
  constructor(props) {
    super(props);
    this.state={
      transactions: getTransactions({transactions:this.props.transactions,len:0,latest:1,landCode:this.props.languageCode})
    }
  }
  onSelect = (item) =>{
    this.props.isVisible = false;
    this.props.onSelect(item)
  }

  noItemDisplay = () =>{
    const {language} = this.props;
    return (
        <Block column center middle style={{padding:Theme.sizes.indent}}>
          <Text gray>{language.noTransactions}</Text>
        </Block>
    );
  }
  renderTransactionItem = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.type==1 ? Theme.colors.green : Theme.colors.black;
    return(<Ripple onPress={()=> this.onSelect(item) }>
      <Block row center space="around" style={appStyles.listItemTrans}>
        <Block row flex={1} left>
          <View style={[
            appStyles.catIcon,
            appStyles.catIconMid,
            {backgroundColor: item.cat ? catIcon[item.cat].color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
            ]}
            >
            <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
          </View>
        </Block>
        <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
          <Text numberOfLines={1}>{item.place ? item.place : language['unknown']}</Text>
          <Text small gray>{accounts[item.acid] ? `${accounts[item.acid].name} - ` : ''}{item.cat ? language[item.cat] : language['unknown']}</Text>
        </Block>
        <Block column flex={1.5} right>
          <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
          <Text gray small>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
        </Block>
      </Block>
    </Ripple>);
  }

  render() {
    const {language, type} = this.props;
    let transactions = type!= '' ? this.props.transactions.filter((tran) => (tran.cat==type)) : this.props.transactions;
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropOpacity={ 0.2 }
        animationIn={ 'fadeInUp' }
        animationOut={ 'fadeOutDown' }
        onBackdropPress={ () => { this.props.toggleModal(); } }
        onBackButtonPress={ () => { this.props.toggleModal(); } }
        style={{}}
        useNativeDriver
      > 
        <View style={[appStyles.modalContent,{width:'100%'}]}>
          <View style={{height:Theme.sizes.indent6x*3, width:'100%'}}>
            <Block column>
              <Text title center>{this.props.title ? this.props.title : language.selectAcc}</Text>
              <Divider style={{marginBottom:0, flex:0}} color={Theme.colors.gray3}/>
              <FlatList
                data={transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionItem}
                ListEmptyComponent={this.noItemDisplay}
              />
          </Block>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId),
  languageCode = state.settings.languageCode;
  return {
    language: language,
    languageCode:languageCode,
    accounts: state.accounts.items,
    transactions:  getTransactions({transactions:state.transactions.items,len:0,latest:1,landCode:languageCode}),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, null)(selectAccount);