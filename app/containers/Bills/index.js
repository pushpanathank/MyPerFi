import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import { connect } from "react-redux";
// https://stackoverflow.com/questions/56092937/local-schedule-notification-react-native
import { Theme, Screens, ActionTypes, IconList, Account } from '../../constants';
import { Logo, Headers, Block, Icon, IconMenu, IconBell, Text, Button, Ripple, CurrencySymbol, Divider, SelectTransaction } from '../../components';
import { getLanguage } from '../../utils/common';
import { formatDate, getCurrentBillMonth, getBillDaysLeft, arrangeBills } from '../../utils/accounts';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Tabs, Tab, ScrollableTab, TabHeading,
} from 'native-base';
import { billActions } from "../../actions/";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const iconBills = IconList.iconBills;
const cycle = Account.cycle;
let activeTab = 0;

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: activeTab,
      selectAccModal: false,
      item:{}
    }
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  goToBillsManage = (type) => {
    this.props.navigation.navigate(Screens.BillsManage.route,{id:0,type:type});
  }

  markAsPaid = (item,selectTrans)=>{
    this.setState({ item:item });
    this.toggleAccModal();
    if(!selectTrans){
      item.paid=true;
      this.props.markPaid(item);
    }
  }

  toggleAccModal = () => {
    this.setState({selectAccModal: !this.state.selectAccModal});
  }

  onSelectTransaction = (transaction) => {
    // console.log("item", transaction);
    this.toggleAccModal();
    this.props.markPaidWith({transaction:transaction,bill:this.state.item});
  }

  generateBills = ()=>{
    this.props.generate();
  }

  onChangeTab(obj){
    activeTab = obj.i;
    this.setState({activeTab: activeTab});
  }

  renderCurrentBills = ({item}) =>{
    if(!item.name) return;
    const {language, languageCode, accounts} = this.props;
    let color = item.paid ? Theme.colors.green : Theme.colors.black,
    daysLeft = getBillDaysLeft(item.date),
    bgColor = daysLeft<0 ? Theme.colors.accent : Theme.colors.green;
    return(
      <Block block shadow color="white" margin={[Theme.sizes.indentsmall, Theme.sizes.indenthalf]} padding={Theme.sizes.indent}>
      <Ripple
        onPress={() => { this.props.navigation.navigate(Screens.BillsManage.route,{id:item.id,type:this.state.activeTab}) }}
        >
        <Block row center space="around">
          <Block row flex={1} left>
            <View style={[
              appStyles.catIcon,
              appStyles.catIconMid,
              {backgroundColor: iconBills[item.type].color, marginHorizontal: Theme.sizes.indenthalf}
              ]}
              >
              <Icon name={item.type} size={Theme.sizes.title}/>
            </View>
          </Block>
          <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
            <Text numberOfLines={1}>{item.name}</Text>
            <Text small gray>{language[item.type]} - {language[cycle[item.cyc]]}</Text>
          </Block>
          {
            item.paid ?
            <Block column flex={1.4} right middle>
              <Text style={[appStyles.paid]} center>{language.paid}</Text>
            </Block>
            :
            <Block column flex={1.4} right middle>
              <Text style={[styles.dayPay,{backgroundColor:bgColor}]} center>{daysLeft}</Text>
              <Text gray small>{daysLeft<0 ? language.daysOverdue : language.daysToPay }</Text>
            </Block>
          }
        </Block>
        </Ripple>
        <Divider style={{marginTop:Theme.sizes.indenthalf,marginBottom:Theme.sizes.indentsmall}}/>
        <Block row center space="around">
          <Block column left>
            <Icon name="trends" size={Theme.sizes.h3} color={Theme.colors.gray} />
            <Text gray small>Bill History</Text>
          </Block>
          <Block column right>
            <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.partPaid? item.amount : item.initAmt } </Text>
            <Text gray small>{language.dueDate} : {formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
          </Block>
        </Block>
        <Block row>
          {
            !item.paid ? 
            <Button color="secondary" block onPress={() => { this.markAsPaid(item,1) }}>
              <Text center>{language.markPaid}</Text>
            </Button>
            :
            <View />
          }
        </Block>
      </Block>);
  }

  renderBills = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.paid ? Theme.colors.green : Theme.colors.black;
    return(
      <Ripple
        style={[appStyles.listItem,{margin:0}]}
        onPress={() => { this.props.navigation.navigate(Screens.BillsManage.route,{id:item.id,type:this.state.activeTab}) }}
        >
        <Block row center space="around">
          <Block row flex={1} left>
            <View style={[
              appStyles.catIcon,
              appStyles.catIconMid,
              {backgroundColor: iconBills[item.type].color, marginHorizontal: Theme.sizes.indenthalf}
              ]}
              >
              <Icon name={item.type} size={Theme.sizes.title}/>
            </View>
          </Block>
          <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
            <Text numberOfLines={1}>{item.name}</Text>
            <Text small gray>{language[item.type]} - {language[cycle[item.cyc]]}</Text>
          </Block>
          <Block column flex={1.4} right>
            <Text style={{color: color }}><CurrencySymbol size='header' color={color}/> {item.amount} </Text>
            {
              (item.cyc==1 || item.cyc==7) ?
              <Text gray small>{language[cycle[item.cyc]]}</Text> :
              <Text gray small>{language.dueDate} : {formatDate({lang:languageCode, date:item.date, format:'dateShort'})}</Text>
            }
          </Block>
        </Block>
      </Ripple>
      );
  }

  noItemDisplay = () => {
    const {language} = this.props;
    if(this.state.activeTab==0){
      return (
        <Block column center middle style={{padding:Theme.sizes.indent}}>
          <Text gray>{language.noBills}</Text>
          <Text gray style={{marginTop:Theme.sizes.indenthalf}}>{language.genBill}</Text>
          <Button color="secondary" block onPress={() => { this.generateBills() }} style={{paddingHorizontal:Theme.sizes.indent,marginTop:Theme.sizes.indent}}>
            <Text center white>{language.generate}</Text>
          </Button>
        </Block>
      );
    }else{
      return (
        <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language.noBills}</Text></Block>
      );
    }
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
            leftIcon={<IconMenu {...this.props} />} 
            rightIcon={<IconBell {...this.props} />}
            />

          <SelectTransaction 
            item={this.state.item}
            title={language.paidWith}
            isVisible={this.state.selectAccModal}
            toggleModal={this.toggleAccModal}
            onSelect={this.onSelectTransaction}
            markAsPaid={this.markAsPaid}
            />

          <View style={[appStyles.heading40,{paddingTop:0}]}>
            <Text h3 white light>{language.billemi}</Text>
          </View>
            <View style={[appStyles.contentBg]}>
              <Tabs transparent 
                tabBarUnderlineStyle={appStyles.tabBarUnderlineStyle}
                onChangeTab={this.onChangeTab}
                renderTabBar={()=> <ScrollableTab style={appStyles.tabsAcc} />}>                  
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                    <TabHeading style={{ backgroundColor: "transparent" }}>
                        <Text white>{language.currBills}</Text>
                    </TabHeading>}>
                    <Block>

                      <FlatList
                      contentContainerStyle={{ paddingBottom: Theme.sizes.indent3x}}
                      data={this.props.currBills}
                      numColumns={1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderCurrentBills}
                      ListEmptyComponent={this.noItemDisplay}
                    />
                    
                      <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
                        onPress={() => { this.goToBillsManage(0); }}
                        style={appStyles.fabBottomRight}
                        >
                        <Icon name="plus" size={16} />
                      </Button>
                    </Block>
                  </Tab>
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                    <TabHeading style={{ backgroundColor: "transparent" }}>
                      <Text white>{language.manageBills}</Text>
                    </TabHeading>}>
                    <Block>

                    <FlatList
                      contentContainerStyle={{ paddingBottom: Theme.sizes.indent3x}}
                      data={this.props.bills}
                      numColumns={1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderBills}
                      ListEmptyComponent={this.noItemDisplay}
                    />
                    
                      <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
                        onPress={() => { this.goToBillsManage(1); }}
                        style={appStyles.fabBottomRight}
                        >
                        <Icon name="plus" size={16} />
                      </Button>
                    </Block>
                  </Tab>
              </Tabs> 
            </View>   
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {

// console.log("state.bills", state.bills.items);
  let curr_month = getCurrentBillMonth(),
  currBillsObj = state.bills[curr_month] || {};
  return {
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
    bills: Object.values(state.bills.items||{}),
    billsObj: state.bills.items || {},
    currBills: arrangeBills(currBillsObj,0),
    currBillsObj: currBillsObj,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markPaid: (values) => dispatch(billActions.addBiller(values)),
    markPaidWith: (values) => dispatch(billActions.markPaidWith(values)),
    generate: () => dispatch(billActions.generateBills()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Bills);