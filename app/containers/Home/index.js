import React from 'react'
import { StyleSheet, View, ImageBackground, Image, FlatList} from 'react-native'
import {
  Container,
  Content,
} from 'native-base';
import Modal from 'react-native-modal';
import PureChart from 'react-native-pure-chart';

import { Theme, Screens, IconList, Account } from '../../constants';
import { Icon, Headers, Block, Text, Divider, Button, Ripple, CurrencySymbol, IconMenu, IconBell, PercentageCircle, SelectAccount, SetBudget } from '../../components';
import { formatDate, getDaysLeft, getAccSum, getCurrentMonthTotalSpend, getTopSpendAreas, topSpendGraph, getCurrentBillMonth, getBillSum } from '../../utils/accounts';
import { getLanguage, getObjectNValues } from '../../utils/common';
import imgs from '../../assets/images';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = IconList.iconList;
const cycle = Account.cycle;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTransModal: false,
      transType:0,
      selectAccModal: false,
      selectBudgetModal: false
    }
  }
  toggleTransModal = () => {
    this.setState({addTransModal: !this.state.addTransModal});
  }
  toggleAccModal = (type) => {
    this.setState({selectAccModal: !this.state.selectAccModal, addTransModal:false, transType:type});
  }
  toggleBudgetModal = (type) => {
    this.setState({selectBudgetModal: !this.state.selectBudgetModal, addTransModal:false, selectAccModal:false});
  }

  manageTransaction = (type,transid,accid) =>{
    if(transid==0) this.setState({addTransModal: false, selectAccModal:false});
    this.props.navigation.navigate(Screens.TransactionManage.route,{type:type,transid:transid,accid:accid})
  }

  renderTransactionItem = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.type ? Theme.colors.green : Theme.colors.black;
    return(<Ripple onPress={()=> this.manageTransaction(item.type,item.id,item.acid) }>
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
        <Block column flex={1.2} right>
          <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
          <Text gray small>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
        </Block>
      </Block>
    </Ripple>);
  }

  renderTopSpendItem = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.cat ? catIcon[item.cat].color : Theme.colors.accent,
    percentage = ((item.amount/this.props.currMonthSpend)*100).toFixed(2);
    return(<Ripple>
      <Block row center space="around" style={appStyles.listItemTrans}>
        <Block row flex={1} left>
          <View style={[
            appStyles.catIcon,
            appStyles.catIconMid,
            {backgroundColor: color, marginHorizontal: Theme.sizes.indenthalf}
            ]}
            >
            <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
          </View>
        </Block>
        <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
          <Text>{language[item.cat]}</Text>
          <View style={{width:`${percentage}%`, backgroundColor:color, height:Theme.sizes.indentsmall, marginTop:Theme.sizes.indentsmall}}></View>
        </Block>
        <Block column flex={1.2} right>
          <Text><CurrencySymbol size='header'/> {item.amount} </Text>
          <Text gray small>{`${percentage}%`}</Text>
        </Block>
      </Block>
    </Ripple>);
  }
  renderBillItem = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.paid ? Theme.colors.green : Theme.colors.black;
    return(<Ripple
        onPress={() => { this.props.navigation.navigate(Screens.BillsManage.route,{id:item.id,type:0}) }}
        >
        <Block row center space="around" style={appStyles.listItemTrans}>
          <Block row flex={1} left>
            <View style={[
              appStyles.catIcon,
              appStyles.catIconMid,
              {backgroundColor: catIcon[item.type].color, marginHorizontal: Theme.sizes.indenthalf}
              ]}
              >
              <Icon name={item.type} size={Theme.sizes.title}/>
            </View>
          </Block>
          <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
            <Text numberOfLines={1}>{item.name}</Text>
            <Text small gray>{language[item.type]} - {language[cycle[item.cyc]]}</Text>
          </Block>
          <Block column flex={1.2} right>
            <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
            {
              (item.cyc==1 || item.cyc==7) ?
              <Text gray small>{language[cycle[item.cyc]]}</Text> :
              <Text gray small>{formatDate({lang:languageCode, date:item.date, format:'dateShort'})} - {language.every} {language[cycle[item.cyc]]}</Text>
            }
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

  goToAccounts = ()=>{
    this.setState({addTransModal: false, selectAccModal:false});
    this.props.navigation.navigate(Screens.Accounts.route);
  }

  goToBills = ()=>{
    this.props.navigation.navigate(Screens.Bills.route);
  }

  summaryText = () => {
    const {language, currMonthSpend, budget} = this.props;
    let overSpent = (budget>0 && currMonthSpend > budget) ? 1: 0;
    return(<Block middle center>
            <Text white>{overSpent ? language.overSpent : (budget>0 ? language.safeSpend : language.spend )}</Text>
              {
                overSpent ?
                <Text h2 color={Theme.colors.red}><CurrencySymbol size='h2' color={Theme.colors.red}/> {currMonthSpend - budget} </Text>
                :
                <Text white h2><CurrencySymbol size='h2' color={'white'}/> {budget>0 ? budget - currMonthSpend : currMonthSpend} </Text>
              }
              <Text small gray3>{getDaysLeft()} {language.daysLeft}</Text>
          </Block>);
  }

  spendPercentage = ()=>{
    let percentage = (this.props.currMonthSpend/this.props.budget)*100;
    if(percentage>100){
      percentage = 100;
    }
    return this.props.budget > 0 ? percentage : 0;
  }

  render(){
    const {language, languageId, languageCode, availableBal, currMonthSpend, budget} = this.props;
    const modalWidth = languageId ? {width: Theme.sizes.indent3x*4}:{};
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={formatDate({lang:languageCode,format:'month'})} 
            leftIcon={<IconMenu {...this.props} />} 
            rightIcon={<IconBell {...this.props} />}
            />

          <Modal
            isVisible={this.state.addTransModal}
            backdropOpacity={ 0.2 }
            animationIn={ 'fadeInUp' }
            animationOut={ 'fadeOutDown' }
            onBackdropPress={ () => { this.toggleTransModal(); } }
            onBackButtonPress={ () => { this.toggleTransModal(); } }
            style={appStyles.bottomFabRightModal}
            useNativeDriver
          > 
            <View style={[appStyles.fabContentModal]}>
              <View style={[appStyles.fabAddTransContent,modalWidth]}>
                <Block middle>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.toggleAccModal(1)}}>
                    <Text>{language.addIn}</Text>
                  </Button>
                </Block>
                <Block middle>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.toggleAccModal(0) }}>
                    <Text>{language.addEx}</Text>
                  </Button>
                </Block>
              </View>
            </View>
          </Modal>

          <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
            onPress={() => { this.toggleTransModal(); }}
            style={appStyles.fabBottomRight}
            >
            <Icon name="plus" size={16} />
          </Button>

          <SelectAccount 
            isVisible={this.state.selectAccModal}
            transType={this.state.transType}
            toggleModal={this.toggleAccModal}
            onSelect={this.manageTransaction}
            goToAccounts={this.goToAccounts}
            />

          <SetBudget 
            isVisible={this.state.selectBudgetModal}
            toggleModal={this.toggleBudgetModal}
            onSelect={this.toggleBudgetModal}
            />

          <Content enableOnAndroid style={appStyles.row}>
            <Block block center middle style={styles.dashboard}>
              <Ripple onPress={this.toggleBudgetModal} rippleContainerBorderRadius={Theme.sizes.indent6x}>
                <PercentageCircle 
                  radius={Theme.sizes.indent6x} 
                  percent={this.spendPercentage()} 
                  borderWidth={Theme.sizes.indent/1.6}
                  color={currMonthSpend > budget ? Theme.colors.red : Theme.colors.secondary} 
                  >
                  {this.summaryText()}
                </PercentageCircle>
              </Ripple>
              <Block row space="between" padding={[Theme.sizes.indent,0]}>
                <Block>
                  <Ripple onPress={this.goToAccounts} style={{padding:Theme.sizes.indenthalf}}>
                    <Text white body><CurrencySymbol size='body' color={'white'}/> {availableBal} </Text>
                    <Text small gray3>{language.bankBal}</Text>
                  </Ripple>
                </Block>
                <Divider vertical height={70} />
                {
                  this.props.budget == 0 ?
                  <Block center>
                    <Ripple onPress={this.toggleBudgetModal} style={appStyles.btnSetBudget} rippleContainerBorderRadius={10}>
                      <Text small white numberOfLines={1}>{language.setBudget}</Text>
                    </Ripple>
                  </Block>: 
                  <Block>
                    <Ripple onPress={this.goToAccounts} style={{padding:Theme.sizes.indenthalf}}>
                      <Text white body center><CurrencySymbol size='body' color={'white'}/> {currMonthSpend} </Text>
                      <Text small gray3 center>{language.spend}</Text>
                    </Ripple>
                  </Block>
                }
                <Divider vertical height={70} />
                <Block right>
                  <Ripple onPress={this.goToBills} style={{padding:Theme.sizes.indenthalf}}>
                    <Text white body><CurrencySymbol size='body' color={'white'}/> {this.props.currBillsSum.sum}</Text>
                    <Text small gray3>{this.props.currBillsSum.count} {language.billDue}</Text>
                  </Ripple>
                </Block>
              </Block>
            </Block>
            <Block block shadow color="white" margin={[Theme.sizes.indentsmall, Theme.sizes.indenthalf]} padding={Theme.sizes.indent}>
              <Text h5 light>{language.latestTrans}</Text>
              <Divider style={{marginBottom:0}}/>
              <FlatList
                data={this.props.latestTransactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionItem}
                ListEmptyComponent={this.noItemDisplay('noTransactions')}
              />
            </Block>
            <Block block shadow color="white" margin={[Theme.sizes.indentsmall, Theme.sizes.indenthalf]} padding={Theme.sizes.indent}>
              <Text h5 light>{language.topSpend}</Text>
              <Divider style={{marginBottom:0}}/>
              {/* <Block center middle padding={[Theme.sizes.indenthalf]}>
                <PureChart data={sampleData} type='pie' />
                <View style={appStyles.topSpendChartInfo}><Text>{language.total} {language.spend}</Text>
                <Text h2><CurrencySymbol size='h2'/> {this.props.currMonthSpend}</Text></View>
              </Block> */ }
              <FlatList
                data={this.props.topSpendAreas}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTopSpendItem}
                ListEmptyComponent={this.noItemDisplay('noTransactions')}
              />
            </Block>
            <Block block shadow color="white" margin={[Theme.sizes.indentsmall, Theme.sizes.indenthalf, Theme.sizes.indent2x, Theme.sizes.indenthalf]} padding={Theme.sizes.indent}>
              <Text h5 light>{language.bills}</Text>
              <Divider style={{marginBottom:0}}/>
              <FlatList
                data={this.props.currBills}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderBillItem}
                ListEmptyComponent={this.noItemDisplay('noBills')}
              />
            </Block>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId),
  transactions = state.transactions.items,
  accounts = state.accounts.items,
  topSpendAreas= getTopSpendAreas({transactions:transactions}),
  currMonthSpend= getCurrentMonthTotalSpend(transactions),
  curr_month = getCurrentBillMonth(),
  currBillsObj = state.bills[curr_month] || {};
    return {
      user: state.auth.user,
      languageId: state.settings.languageId,
      languageCode: state.settings.languageCode,
      budget: parseInt(state.settings.budget),
      language: language,
      latestTransactions: getObjectNValues({obj:transactions,n:0,sort:-1}),
      transactions: [],
      accounts: {...accounts},
      availableBal: getAccSum(accounts,-1),
      currMonthSpend: currMonthSpend,
      topSpendAreas: Object.values(topSpendAreas),
      currBills: getObjectNValues({obj:currBillsObj,n:3,sort:-1}),
      currBillsSum: getBillSum(currBillsObj,2),
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
