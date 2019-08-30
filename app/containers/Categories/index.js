import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import _ from 'lodash'; 
import { Layout, Theme, Screens, Account, IconList as iconList, ActionTypes } from '../../constants';
import { Logo, Svgicon, Headers, IconList, Block, ModalBox } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button, Icon,
  Text, Tabs, Tab, ScrollableTab, TabHeading, List, ListItem, Fab,
  Header,
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIconModal: false
    }
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
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
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
                        dataArray={Account.incomeCat}
                        contentContainerStyle={appStyles.accList}
                        keyExtractor={(item, index) => index.toString()} 
                        horizontal={false}
                        renderRow={(data) => {
                          return (
                            <ListItem transparent
                            >
                                <Block row style={styles.inputRow}>
                                  <Block style={{flex:1}}>
                                    <Block middle center style={[appStyles.iconListItem,{backgroundColor:iconList[data].color,margin:0}]}>
                                      <Svgicon 
                                        style={appStyles.iconListSingle} 
                                        color={Theme.colors.white} 
                                        name={data} 
                                        width={18} 
                                        height={18} />
                                      </Block>
                                  </Block>
                                  <Block row left style={{flex:4}}>
                                    <Text>{language[data]}</Text>
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
                        dataArray={Account.expenseCat}
                        contentContainerStyle={appStyles.accList}
                        keyExtractor={(item, index) => index.toString()} 
                        horizontal={false}
                        renderRow={(data) => {
                          return (
                            <ListItem transparent
                                onPress={() => this.props.selectedColor(data)}>
                                <Block row style={styles.inputRow}>
                                  <Block style={{flex:1}}>
                                    <Block middle center style={[appStyles.iconListItem,{backgroundColor:iconList[data].color,margin:0}]}>
                                      <Svgicon 
                                        style={appStyles.iconListSingle} 
                                        color={Theme.colors.white} 
                                        name={data} 
                                        width={18} 
                                        height={18} />
                                      </Block>
                                  </Block>
                                  <Block row left style={{flex:4}}>
                                    <Text>{language[data]}</Text>
                                  </Block>
                                </Block>
                            </ListItem>
                          );
                        }}
                      />
                  </Tab>
              </Tabs> 
            </View>
            <Fab
              active={this.state.visibleIconModal}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: Theme.colors.secondary }}
              position="bottomRight"
              onPress={() => this.state.visibleIconModal = true}>
                <Svgicon 
                  color={Theme.colors.white} 
                  name='plus' 
                  width={18} 
                  height={18} />
            </Fab>
            <ModalBox 
                visibleModal={this.state.visibleIconModal}
                content={<IconList />} 
                />
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
      // showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Categories);