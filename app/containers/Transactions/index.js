import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import { connect } from "react-redux";
// https://stackoverflow.com/questions/56092937/local-schedule-notification-react-native
import { Theme, Screens, ActionTypes, Account, IconList } from '../../constants';
import { Headers, Block, Icon, IconBack, IconBell, Text, Button, Ripple, CurrencySymbol, Divider } from '../../components';
import { getLanguage } from '../../utils/common';
import { formatDate, getTopSpendAreas, getCurrentMonthTotalSpend, getTransactions } from '../../utils/accounts';
import imgs from '../../assets/images';
import {  Container,  Content } from 'native-base';
import { billActions } from "../../actions/";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = IconList.iconList;

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  manageTransaction = (type,transid,accid) =>{
    this.props.navigation.navigate(Screens.TransactionManage.route,{type:type,transid:transid,accid:accid})
  }

  renderTransactionMonth = ({item}) =>{
    console.log("item", item);
    const {language, languageCode} = this.props;
    return(<View>
      <Block row center space="around" style={{padding:Theme.sizes.indent}}>
        <Block row left>
          <Text secondary title>{item.month} </Text>
        </Block>
          <Text color={Theme.colors.green} caption><CurrencySymbol size='caption' color={Theme.colors.green}/> {item.in}    </Text>
          <Text color={Theme.colors.red} right caption><CurrencySymbol size='caption' color={Theme.colors.red}/>{item.out}</Text>
      </Block>
      <FlatList
          data={item.trans}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderTransactionItem}
          ListEmptyComponent={this.noItemDisplay('noTransactions')}
        />
    </View>);
  }

  renderTransactionItem = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.type ? Theme.colors.green : Theme.colors.black;
    return(<Ripple onPress={()=> this.manageTransaction(item.type,item.id,item.acid) }>
      <Block row center space="around" style={[appStyles.listItemTrans,styles.listItem]}>
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
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconBack />} 
            rightIcon={<IconBell {...this.props} />}
            />
          <View style={[appStyles.heading40,{paddingTop:0}]}>
            <Text h3 white light>{language.transaction}</Text>
          </View>
            <View style={[appStyles.contentBg]}>
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionMonth}
                ListEmptyComponent={this.noItemDisplay('noTransactions')}
              />
            </View>   
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId),
  transactions = state.transactions.items;
  return {
    language: language,
    accounts : state.accounts.items,
    transactions: getTransactions({transactions:transactions})
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);