import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, IconList, Block } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button,
  Text, Tabs, Tab, ScrollableTab, TabHeading, List, ListItem, 
  Header,
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Categories extends React.Component {
  constructor(props) {
    super(props);
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
          <View style={[appStyles.heading60]}>
            <Text style={appStyles.headingText}>{language.categories}</Text>
            <Text style={appStyles.subheadingText}>{language.manageCat}</Text>
          </View>
            <View style={appStyles.contentBg}>
            {/* <IconList selectedColor={this.setColor} /> */ }
              <Tabs transparent 
              tabBarUnderlineStyle={appStyles.tabBarUnderlineStyle}
              renderTabBar={()=> <ScrollableTab style={appStyles.tabsAcc} />}>                  
                  <Tab 
                  tabStyle={appStyles.tabStyleAcc}
                  heading={ 
                      <TabHeading style={{ backgroundColor: "transparent" }}>
                          <Text color='white'>{language.income}</Text>
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
                                    <Text> 10,000</Text>
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
                      <Text color='white'>{language.expense}</Text>
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
                                    <Text> 10,000</Text>
                                    <Text caption color='gray2'>Estimated Bal</Text>
                                  </Block>
                                </Block>
                            </ListItem>
                          );
                        }}
                      />
                  </Tab>
              </Tabs> 
            </View>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    language: state.settings.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Categories);