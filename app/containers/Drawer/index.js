import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions, DrawerItems } from 'react-navigation'
import {
  Button, View,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Body,
  Left,
  Thumbnail, Header,
  Footer
} from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Theme } from '../../constants';
import styles from './styles';
import { getCurrentRoute, getLanguage } from '../../utils/common';
import { Svgicon, Logo, Block, Text } from '../../components';


class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.listItems = [ Screens.Home,Screens.Accounts,Screens.Categories,Screens.Settings];
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
            <Block row center middle bottom>
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
                      <Svgicon 
                        style={appStyles.drawerIcon} 
                        color={(data.route==currentRoute) ? Theme.colors.secondary:Theme.colors.black} 
                        name={data.icon} 
                        width={20} 
                        height={20} />
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
          <Button iconLeft transparent full style={styles.logoutBtn} onPress={() => this.logout()} >
            <Icon fontSize='12' type='AntDesign' name='logout' style={styles.white} />
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