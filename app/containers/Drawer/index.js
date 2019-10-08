import React from "react";
import { View, AppRegistry, Image, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions, DrawerItems } from 'react-navigation'
import {
  Container,
  List,
  ListItem,
  Content,
  Header,
  Footer
} from "native-base";

import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Theme } from '../../constants';
import styles from './styles';
import { getCurrentRoute, getLanguage } from '../../utils/common';
import { Icon, Logo, Block, Text, Button } from '../../components';


class Drawer extends React.Component {
  constructor(props) {
    super(props);
    // Screens.Categories,
    this.listItems = [ Screens.Home,Screens.Accounts,Screens.Bills,Screens.Settings];
  }

  logout(){
    this.props.logout();
    this.props.navigation.navigate(Screens.SignOutStack.route);
  }
  render() {
    const { navigation, user, language, state } = this.props;
    const currentRoute = getCurrentRoute(state);
    const userName = this.props.user == null ? '' : this.props.user.name;
    const userEmail = this.props.user == null ? '' : this.props.user.email;
    return (
      <Container>
        <Header style={styles.header}>
          <View style={[appStyles.row]}>
            <Block row center middle bottom style={{marginTop:Theme.sizes.indent2x}}>
              <Logo header={true} style={{height: 50,width: 140}}/>
            </Block>
            <Block padding={[0,Theme.sizes.indent]} center>
              <Text h5 white>{userName}</Text>
              <Text gray2>{userEmail}</Text>
            </Block>
          </View>
        </Header>
        <Content>
          <List
              dataArray={this.listItems}
              keyExtractor={(item, index) => index.toString()} 
              style={appStyles.drawerList}
              renderRow={(data) => {
                return (
                  <ListItem 
                  button full
                  noIndent
                  style={[appStyles.drawerItem, data.route==currentRoute ? appStyles.activeDrawerItem : {}]}
                  onPress={() => this.props.navigation.navigate(data.route)}>
                      <Icon 
                        style={appStyles.drawerIcon} 
                        color={(data.route==currentRoute) ? Theme.colors.secondary:Theme.colors.black} 
                        name={data.icon} 
                        size={20} 
                        />
                      <Text
                      style={appStyles.drawerText}>
                      {language[(data.route).toLowerCase()]}</Text>
                  </ListItem>
                );
              }}
            />
          {/*<DrawerItems {...this.props} />*/}
        </Content>
        <Footer style={styles.logoutFooter}>
          <Button block center ripple color='secondary' style={{flexDirection: 'row', marginTop:-5}} onPress={() => this.logout()} >
            <Icon  
              style={{marginRight:Theme.sizes.indenthalf}}  
              color={Theme.colors.white}  
              name={'logout'}   
              size={30}  
              />  
            <Text style={styles.white}>{this.props.language.logout}</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
