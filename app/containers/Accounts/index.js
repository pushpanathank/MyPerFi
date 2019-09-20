import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList, TouchableOpacity} from 'react-native'
import { Screens, Strings, Theme } from '../../constants';
import { Logo, Icon, Headers, Text, Block, CurrencySymbol, Button, Divider, Ripple, IconMenu, IconBell } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
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
      <Divider style={{margin:Theme.sizes.indentsmall}}/>
    );
  };

  noItemDisplay = () => {
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>No accounts avilable</Text></Block>
    );
  };

  onChangeTab(obj){
    activeTab = obj.i;
    this.setState({activeTab: activeTab});
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
            rightIcon={<IconBell {...this.props} />}
            />
          <Block block>
            <Block center middle style={{flex: 1}}>
              <Text color='white'>{language.current} {language.totalBalance}</Text>
              <Text color='secondary' style={{marginBottom: 15}}>{this.state.activeTab ? this.props.walletAcc.length : this.props.bankAcc.length  } {language.accounts}</Text>
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
                        data={this.props.bankAcc}
                        ItemSeparatorComponent={this.itemSeparator}
                        ListEmptyComponent={this.noItemDisplay}
                        renderItem={({ item }) => (
                          <Ripple
                            onPress={() => { this.props.navigation.navigate(Screens.AccountsManage.route,{activeTab:activeTab, id:item.id}) }}
                            >
                            <Block row space="between" style={appStyles.listItem}>
                              <Block middle>
                                <Text>{item.name}</Text>
                                <Text caption color='gray2'>{item.no!=''? `x${item.no}`:''}</Text>
                              </Block>
                              <Block middle right>
                                <Text><CurrencySymbol /> {item.bal}</Text>
                                <Text caption color='gray2'>{language.estBal}</Text>
                              </Block>
                            </Block>
                          </Ripple>
                          )}
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
                        data={this.props.walletAcc}
                        ItemSeparatorComponent={this.itemSeparator}
                        ListEmptyComponent={this.noItemDisplay}
                        renderItem={({ item }) => (
                          <Ripple
                            onPress={() => { this.props.navigation.navigate(Screens.AccountsManage.route,{activeTab:activeTab, id:item.id}) }}
                            style={appStyles.listItem}
                            >
                            <Block row space="between" style={styles.inputRow}>
                              <Block middle>
                                <Text>{item.name}</Text>
                              </Block>
                              <Block middle right>
                                <Text><CurrencySymbol /> {item.bal}</Text>
                                <Text caption color='gray2'>{language.estBal}</Text>
                              </Block>
                            </Block>
                          </Ripple>
                          )}
                        keyExtractor={(item, index) => index.toString()}
                      />
                  </Tab>
              </Tabs> 
              </Block>
            </Block>
            <Button
              onPress={() => { this.props.navigation.navigate(Screens.AccountsManage.route,{activeTab:activeTab, id:null}) }}
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
  return {
    language: getLanguage(state.settings.languageId),
    bankAcc: Object.values(state.accounts.bankAcc),
    walletAcc: Object.values(state.accounts.walletAcc),
    bankAccSum: state.accounts.bankAccSum,
    walletAccSum: state.accounts.walletAccSum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);