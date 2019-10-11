import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList, Animated, ScrollView} from 'react-native'
import { connect } from "react-redux";

// https://stackoverflow.com/questions/56092937/local-schedule-notification-react-native
import { Theme, Screens, ActionTypes, Account } from '../../constants';
import { Headers, Block, Icon, IconBack, IconButton, Text, Button, Ripple, CurrencySymbol, Divider } from '../../components';
import { getLanguage, getCategoryByKey } from '../../utils/common';
import { formatDate, getTopSpendAreas, getCurrentMonthTotalSpend, getTransactions } from '../../utils/accounts';
import imgs from '../../assets/images';
import {  Container,  Content } from 'native-base';
import { billActions } from "../../actions/";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const HEADER_MIN_HEIGHT = 75;
const HEADER_MAX_HEIGHT = 200;

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const type = navigation.getParam('type'),
    accId = navigation.getParam('id')||0,
    trans = getTransactions({transactions:this.props.transactions,accId:accId}),
    transArr=[];
    for(let t in trans){
      let header = {month:trans[t].month, in:trans[t].in, out:trans[t].out, isHeader: true},
      tr=trans[t];
      transArr.push(header);
      for(let i in tr.trans){
        let ti = tr.trans[i];
        ti.isHeader = false;
        transArr.push(ti);
      }
    }
    this.state = {
      accId:accId,
      type:type,
      loaded:20,
      transactions: transArr
    }
    this.editAccount = this.editAccount.bind(this);
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  _handleLoadMore = () =>{
    console.log("_handleLoadMore");

  }
  manageTransaction = (type,transid,accid) =>{
    if(type==2){
      this.props.navigation.navigate(Screens.AccountsTransfer.route,{type:type,transid:transid,accid:accid});
    }else{
      this.props.navigation.navigate(Screens.TransactionManage.route,{type:type,transid:transid,accid:accid});
    }
  }

  editAccount(){
    const {accId,type} = this.state;
    this.props.navigation.navigate(Screens.AccountsManage.route,{type:type, id:accId});
  }

  renderTransactionMonth = ({item}) =>{
    const {language, languageCode} = this.props;
    
    if(item.isHeader){
      return(<Block row center space="around" style={{padding:Theme.sizes.indent,backgroundColor: Theme.colors.white}}>
        <Block row left>
          <Text secondary title>{item.month} </Text>
        </Block>
          <Icon name="plus_filled" size={10} color={Theme.colors.green} style={{marginHorizontal:5}}/> 
          <Text color={Theme.colors.green} caption>
          <CurrencySymbol size='caption' color={Theme.colors.green}/> {item.in}    
          </Text>
          <Icon name="minus_filled" size={10} color={Theme.colors.red} style={{marginHorizontal:5}}/> 
          <Text color={Theme.colors.red} right caption>
          <CurrencySymbol size='caption' color={Theme.colors.red}/>{item.out}
          </Text>
      </Block>);
    }else{
      return this.renderTransactionItem(item);
    }
  }

  renderTransactionItem = (item) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.type==1 ? Theme.colors.green : Theme.colors.black;
    return(<Ripple onPress={()=> this.manageTransaction(item.type,item.id,item.acid) }>
      <Block row center space="around" style={[appStyles.listItemTrans,styles.listItem]}>
        <Block row flex={1} left>
          <View style={[
            appStyles.catIcon,
            appStyles.catIconMid,
            {backgroundColor: item.cat ? getCategoryByKey(item.cat).color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
            ]}
            >
            <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
          </View>
        </Block>
        <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
          <Text numberOfLines={1}>{item.place ? item.place : language['unknown']}</Text>
          <Text small gray>{accounts[item.acid] ? `${accounts[item.acid].name} - ` : ''}{item.cat ? language[item.cat] : language['unknown']}</Text>
        </Block>
        <Block column flex={1.2} right>
          <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
          <Text gray small>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
        </Block>
      </Block>
    </Ripple>);
  }

  noItemDisplay = (key) => {
    const {language} = this.props;
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language[key]}</Text></Block>
    );
  };

  render(){
    const {language, accounts} = this.props;
    const acc = accounts[this.state.accId],
    title = this.state.accId!=0 ? acc.name : language.transaction;
    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
          )}>
                  <FlatList
                      data={this.state.transactions}
                      numColumns={1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderTransactionMonth}
                      ListEmptyComponent={this.noItemDisplay('noTransactions')}
                      onEndReached={this._handleLoadMore}
                      onEndReachedThreshold={0.5}
                      initialNumToRender={10}
                    />
          </ScrollView>
         </ImageBackground>

         <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
          <Block row>
            <Block style={{flex:1}}>
              <IconBack />
            </Block>
            <Block middle center style={{flex:4}}>
              <Text h5 white numberOfLines={1}>{title}</Text>
              {
                this.state.accId!=0 ?
                <Text h1 color='white' style={{opacity:1}}><CurrencySymbol size='h1' color={Theme.colors.white}/> {acc.bal}</Text>
                :
                <Text />
              }
            </Block>
            <Block right style={{flex:1}}>
              <IconButton icon={'edit'} onPress={this.editAccount} size={20} />
            </Block>
          </Block>
        </Animated.View>
        
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId);
  return {
    language: language,
    accounts : state.accounts.items,
    transactions: state.transactions.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);