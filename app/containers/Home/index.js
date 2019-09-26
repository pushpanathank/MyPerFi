import React from 'react'
import { StyleSheet, View, ImageBackground, Image, FlatList} from 'react-native'
import {
  Container,
  Content,
} from 'native-base';
import Modal from 'react-native-modal';

import { Theme, Screens, IconList } from '../../constants';
import { Icon, Headers, Block, Text, Divider, Button, Ripple, CurrencySymbol, IconMenu, IconBell, PercentageCircle, SelectAccount } from '../../components';
import { formatDate, getDaysLeft } from '../../utils/accounts';
import { getLanguage, getObjectNValues } from '../../utils/common';
import imgs from '../../assets/images';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = IconList.iconList;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTransModal: false,
      transType:0,
      selectAccModal: false
    }
  }
  toggleTransModal = () => {
    this.setState({addTransModal: !this.state.addTransModal});
  }
  toggleAccModal = (type) => {
    this.setState({selectAccModal: !this.state.selectAccModal, addTransModal:false, transType:type});
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
          <Text>{item.place ? item.place : language['unknown']}</Text>
          <Text small gray>{accounts[item.acid] ? `${accounts[item.acid].name} - ` : ''}{item.cat ? language[item.cat] : language['unknown']}</Text>
        </Block>
        <Block column flex={1} right>
          <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
          <Text gray small>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
        </Block>
      </Block>
    </Ripple>);
  }

  noItemDisplay = () => {
    const {language} = this.props;
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language.noTransactions}</Text></Block>
    );
  };

  goToAccounts = ()=>{
    this.props.navigation.navigate(Screens.Accounts.route);
  }

  summaryText = () => {
    const {language, currMonthSpend, budget} = this.props;
    let overSpent = currMonthSpend > budget ? 1: 0;
    return(<Block middle center>
            <Text white>{overSpent ? language.overSpent :language.spend}</Text>
              {
                overSpent ?
                <Text accent h2><CurrencySymbol size='h2' color={Theme.colors.accent}/> {currMonthSpend - budget} </Text>
                :
                <Text white h2><CurrencySymbol size='h2' color={'white'}/> {currMonthSpend} </Text>
              }
              <Text small gray3>{getDaysLeft()} {language.daysLeft}</Text>
          </Block>);
  }

  spendPercentage = ()=>{
    let percentage = (this.props.currMonthSpend/this.props.budget)*100;
    if(percentage>100){
      percentage = 100;
    }
    return percentage;
  }

  render(){
    const {language, languageId, languageCode, availableBal} = this.props;
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
            />

          <Content enableOnAndroid style={appStyles.row}>
            <Block block center middle style={styles.dashboard}>
              <PercentageCircle 
                radius={Theme.sizes.indent6x} 
                percent={this.spendPercentage()} 
                borderWidth={Theme.sizes.indenthalf}
                color={Theme.colors.secondary} 
                >
                {this.summaryText()}
              </PercentageCircle>
              <Block row space="between" padding={Theme.sizes.indent}>
                <Block bottom>
                  <Ripple onPress={this.goToAccounts} style={{padding:Theme.sizes.indenthalf}}>
                    <Text white body><CurrencySymbol size='body' color={'white'}/> {availableBal} </Text>
                    <Text small gray3>{language.currentBal}</Text>
                  </Ripple>
                </Block>
                <Divider vertical height={70} />
                <Block right>
                  <Ripple onPress={this.goToAccounts} style={{padding:Theme.sizes.indenthalf}}>
                    <Text white body><CurrencySymbol size='body' color={'white'}/>0</Text>
                    <Text small gray3>{language.billDue}</Text>
                  </Ripple>
                </Block>
              </Block>
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.latestTrans}</Text>
              <Divider style={{marginBottom:0}}/>
              <FlatList
                data={this.props.latestTransactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionItem}
                ListEmptyComponent={this.noItemDisplay}
              />
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.topSpend}</Text>
              <Divider style={{marginBottom:0}}/>
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionItem}
                ListEmptyComponent={this.noItemDisplay}
              />
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.bills}</Text>
              <Divider style={{marginBottom:0}}/>
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTransactionItem}
                ListEmptyComponent={this.noItemDisplay}
              />
            </Block>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId);
    return {
      user: state.auth.user,
      languageId: state.settings.languageId,
      languageCode: state.settings.languageCode,
      budget: parseInt(state.settings.budget),
      language: language,
      latestTransactions: getObjectNValues({obj:state.transactions.items,n:3,sort:-1}),
      transactions: [],
      accounts: {...state.accounts.bankAcc, ...state.accounts.walletAcc, ...{0:{id:0,name:language.others}}},
      availableBal: parseInt(state.accounts.bankAccSum)+parseInt(state.accounts.walletAccSum),
      currMonthSpend: state.transactions.currMonthSpend,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
