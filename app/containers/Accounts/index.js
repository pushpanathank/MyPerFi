import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList, TouchableOpacity} from 'react-native'
import { Screens, Strings, Theme } from '../../constants';
import { Icon, Headers, Text, Block, CurrencySymbol, Button, Divider, Ripple, IconMenu, IconButton } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import { groupAccType, getAccSum } from '../../utils/accounts';
import imgs from '../../assets/images';
import {
  Container, Content, Tabs, Tab, ScrollableTab, TabHeading, List, ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

let activeTab = 0;

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: activeTab,
    }
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  itemSeparator = () => {
    return (
      <Divider style={{marginVertical:0}}/>
    );
  };

  noItemDisplay = () => {
    const {language} = this.props;
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language.noAccounts}</Text></Block>
    );
  };

  accTransfer = () => {
    this.props.navigation.navigate(Screens.AccountsTransfer.route,{transid:0});
  };

  onChangeTab(obj){
    activeTab = obj.i;
    this.setState({activeTab: activeTab});
  }

  renderAccountItem = ({item}) =>{
    const {language} = this.props;
    return(<Ripple
        style={[appStyles.listItem,{margin:0}]}
        onPress={() => { this.props.navigation.navigate(Screens.Transactions.route,{type:item.type, id:item.id}) }}
        >
        <Block row space="between">
          <Block middle>
            <Text header>{item.name}</Text>
            {this.state.activeTab == 0 ?
            <Text small color='gray2'>{item.no!=''? `x${item.no}`:''}</Text>:
            <Text />
            }
          </Block>
          <Block middle right>
            <Text header><CurrencySymbol /> {item.bal}</Text>
            <Text small color='gray2'>{language.estBal}</Text>
          </Block>
        </Block>
      </Ripple>);
  }

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
            rightIcon={<IconButton icon={'transfer'} size={23} onPress={this.accTransfer} />}
            />
          <Block block>
            <Block center middle style={{flex: 1}}>
              <Text color='white'>{language.current} {language.totalBalance}</Text>
              <Text color='secondary' style={{marginBottom: 15}}>{this.state.activeTab ? this.props.wallAcc.length : this.props.bankAcc.length  } {language.accounts}</Text>
              <Text h1 color='white'><CurrencySymbol size='h1' color={Theme.colors.white}/> {this.state.activeTab ? this.props.walletAccSum : this.props.bankAccSum }</Text>
            </Block>
            <Block style={styles.contentBgAccount}>
              <Tabs transparent 
              tabBarUnderlineStyle={appStyles.tabBarUnderlineStyle}
              onChangeTab={this.onChangeTab}
              renderTabBar={()=> <ScrollableTab style={appStyles.tabsAcc} />}>                  
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                      <TabHeading style={{ backgroundColor: "transparent" }}>
                          <Text color='white'>{language.bankacc}</Text>
                      </TabHeading>}>
                      <FlatList
                        contentContainerStyle={{ paddingBottom: Theme.sizes.indent3x}}
                        data={this.props.bankAcc}
                        ItemSeparatorComponent={this.itemSeparator}
                        ListEmptyComponent={this.noItemDisplay}
                        renderItem={this.renderAccountItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                        
                  </Tab>
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                    <TabHeading style={{ backgroundColor: "transparent" }}>
                      <Text color='white'>{language.wallets}</Text>
                    </TabHeading>}>

                    <FlatList
                        contentContainerStyle={{ paddingBottom: Theme.sizes.indent3x}}
                        data={this.props.wallAcc}
                        ItemSeparatorComponent={this.itemSeparator}
                        ListEmptyComponent={this.noItemDisplay}
                        renderItem={this.renderAccountItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                  </Tab>
              </Tabs> 
              </Block>
            </Block>
            <Button
              onPress={() => { this.props.navigation.navigate(Screens.AccountsManage.route,{type:activeTab, id:null}) }}
             style={appStyles.fabBottomRight}
            >
             <Icon name={'plus'} size={18} />
            </Button>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let accounts = state.accounts.items || {};
  return {
    language: getLanguage(state.settings.languageId),
    accounts: Object.values(accounts),
    bankAcc: groupAccType({accounts:accounts,type:0,isArray:1}),
    wallAcc: groupAccType({accounts:accounts,type:1,isArray:1}),
    bankAccSum: getAccSum(accounts,0),
    walletAccSum: getAccSum(accounts,1),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);