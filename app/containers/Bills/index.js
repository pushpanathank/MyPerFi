import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import { connect } from "react-redux";
// https://stackoverflow.com/questions/56092937/local-schedule-notification-react-native
import { Theme, Screens, ActionTypes, IconList } from '../../constants';
import { Logo, Headers, Block, Icon, IconMenu, IconBell, Text, Button, Ripple, CurrencySymbol } from '../../components';
import { getLanguage } from '../../utils/common';
import { formatDate } from '../../utils/accounts';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Tabs, Tab, ScrollableTab, TabHeading,
} from 'native-base';
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const iconBills = IconList.iconBills;
const cycle = { 1: 'daily',  7: 'weekly',  30: 'monthly',  90: 'quarterly',  180: 'halfyearly',  365: 'yearly' };

class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  goToBillsManage = () => {
    this.props.navigation.navigate(Screens.BillsManage.route,{id:0});
  }

  renderBills = ({item}) =>{
    const {language, languageCode, accounts} = this.props;
    let color = item.type ? Theme.colors.green : Theme.colors.black;
    return(<Ripple
        style={[appStyles.listItem,{margin:0}]}
        onPress={() => { this.props.navigation.navigate(Screens.BillsManage.route,{id:item.id}) }}
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

  noItemDisplay = () => {
    const {language} = this.props;
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language.noTransactions}</Text></Block>
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
            leftIcon={<IconMenu {...this.props} />} 
            rightIcon={<IconBell {...this.props} />}
            />
          <View style={[appStyles.heading40,{paddingTop:0}]}>
            <Text h3 white light>{language.billemi}</Text>
          </View>
            <View style={[appStyles.contentBg]}>
              <Tabs transparent 
              tabBarUnderlineStyle={appStyles.tabBarUnderlineStyle}
              renderTabBar={()=> <ScrollableTab style={appStyles.tabsAcc} />}>                  
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                    <TabHeading style={{ backgroundColor: "transparent" }}>
                        <Text white>{language.currBills}</Text>
                    </TabHeading>}>
                    <Block>

                      <FlatList
                      data={this.props.bills}
                      numColumns={1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderBills}
                      ListEmptyComponent={this.noItemDisplay}
                    />
                    
                      <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
                        onPress={() => { this.goToBillsManage(); }}
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
                      data={this.props.bills}
                      numColumns={1}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderBills}
                      ListEmptyComponent={this.noItemDisplay}
                    />
                    
                      <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
                        onPress={() => { this.goToBillsManage(); }}
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

//console.log("state.bills.items", state.bills.items);
  return {
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
    bills: Object.values(state.bills.items||{}),
    billsObj: state.bills.items || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Bills);