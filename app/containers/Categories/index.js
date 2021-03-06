import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal';
import { Theme, Screens, Account, ActionTypes } from '../../constants';
import { Logo, Headers, IconList, Block, Icon, IconMenu, IconBell, Text } from '../../components';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Button,
  Tabs, Tab, ScrollableTab, TabHeading, List, ListItem, Fab,
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

  toggleIconModal = () => {
    this.setState({visibleIconModal: !this.state.visibleIconModal});
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
          <View style={[appStyles.heading60]}>
            <Text h3 white light>{language.categories}</Text>
            <Text header white>{language.manageCat}</Text>
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
                                    <Block middle center style={[appStyles.catIcon,{backgroundColor:getCategoryByKey(data).color,margin:0}]}>
                                      <Icon 
                                        style={appStyles.iconListSingle} 
                                        name={data} 
                                        size={18} 
                                        />
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
                                onPress={() => this.setColor(data)}>
                                <Block row style={styles.inputRow}>
                                  <Block style={{flex:1}}>
                                    <Block middle center style={[appStyles.catIcon,{backgroundColor:getCategoryByKey(data).color,margin:0}]}>
                                      <Icon 
                                        style={appStyles.iconListSingle} 
                                        name={data} 
                                        size={18} 
                                       />
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

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => { this.toggleIconModal(); }}
             style={appStyles.fabBottomRight}
            >
             <Icon name={'plus'} size={18} />
            </TouchableOpacity>
            
            
            <Modal
              isVisible={this.state.visibleIconModal}
              backdropOpacity={ 0.5 }
              animationIn={ 'slideInUp' }
              animationOut={ 'slideOutDown' }
              onBackdropPress={ () => { this.toggleIconModal(); } }
              onBackButtonPress={ () => { this.toggleIconModal(); } }
              style={{}}
              useNativeDriver
            > 
              <Block row style={[styles.modalContent]}>
                <IconList />
              </Block>
            </Modal>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
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