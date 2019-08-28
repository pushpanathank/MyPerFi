import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens, Strings, Theme } from '../../constants';
import { Logo, Svgicon, Headers, IconList, MyText, Text, Block, CurrencySymbol } from '../../components';
import imgs from '../../assets/images';
import {
  Container, Content, Icon, Spinner, Button, Tabs, Tab, ScrollableTab, TabHeading,
  Header, Left, Body, Title, Right, List, ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Accounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [{ key: 'a' }, { key: 'b' }] }
    this.component = [];
    this.selectedRow;

  }
  setColor(color){
    console.log("color", color);
  }
  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Block block>
          <Block center middle style={{flex: 1}}>
            <Text color='white'>{language.current} {language.totalBalance}</Text>
            <Text color='secondary' style={{marginBottom: 15}}>2 {language.accounts}</Text>
            <Text h1 color='white'><CurrencySymbol size='h1'/> 10,000</Text>
          </Block>
          <Block style={styles.contentBgAccount}>
            <Tabs transparent 
            tabBarUnderlineStyle={appStyles.tabBarUnderlineStyle}
            renderTabBar={()=> <ScrollableTab style={appStyles.tabsAcc} />}>                  
                <Tab 
                tabStyle={appStyles.tabStyleAcc}
                heading={ 
                    <TabHeading style={{ backgroundColor: "transparent" }}>
                        <Text color='white'>{language.bankacc}</Text>
                    </TabHeading>}>
                      <List
                      dataArray={[{ key: 'a', value: 'Citibank' }, { key: 'b', value: 'SBI Bank' }, { key: 'c', value: 'IOB' }, { key: 'd', value: 'South Indian Bank' }, { key: 'e', value: 'Pallavan bank' }]}
                      contentContainerStyle={appStyles.accList}
                      keyExtractor={(item, index) => index.toString()} 
                      horizontal={false}
                      renderRow={(data) => {
                        return (
                          <ListItem transparent
                              onPress={() => this.props.selectedColor(data)}>
                              <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                <Block>
                                  <Text>{data.value}</Text>
                                  <Text caption color='gray2'>x8477</Text>
                                </Block>
                                <Block right>
                                  <Text><CurrencySymbol /> 10,000</Text>
                                  <Text caption color='gray2'>Estimated Bal</Text>
                                </Block>
                              </Block>
                          </ListItem>
                        );
                      }}
                    />
                </Tab>
                <Tab 
                tabStyle={appStyles.tabStyleAcc}
                heading={ 
                  <TabHeading style={{ backgroundColor: "transparent" }}>
                    <Text color='white'>{language.wallets}</Text>
                  </TabHeading>}>
                  <List
                      dataArray={[{ key: 'a', value: 'PayTm' }, { key: 'b', value: 'FreeCharge' }, { key: 'c', value: 'Airtel Money' }, { key: 'd', value: 'MobiKiwik' }]}
                      contentContainerStyle={appStyles.accList}
                      keyExtractor={(item, index) => index.toString()} 
                      horizontal={false}
                      renderRow={(data) => {
                        return (
                          <ListItem transparent
                              onPress={() => this.props.selectedColor(data)}>
                              <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                <Block>
                                  <Text>{data.value}</Text>
                                  <Text caption color='gray2'>x8477</Text>
                                </Block>
                                <Block right>
                                  <Text><CurrencySymbol /> 10,000</Text>
                                  <Text caption color='gray2'>Estimated Bal</Text>
                                </Block>
                              </Block>
                          </ListItem>
                        );
                      }}
                    />
                </Tab>
            </Tabs> 
            </Block>
            </Block>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currSymbol: state.settings.currSymbol,
    language: state.settings.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);