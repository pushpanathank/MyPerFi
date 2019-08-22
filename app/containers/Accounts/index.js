import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens, Strings } from '../../constants';
import { Logo, Svgicon, Headers, IconList } from '../../components';
import imgs from '../../assets/images';
import {
  Container, Content, Icon, Spinner, Button, Text, Tabs, Tab,
  Header, Left, Body, Title, Right
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Accounts extends React.Component {
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
          <View style={[appStyles.headingWithSub]}>
            <Text style={appStyles.headingText}>{language.accounts}</Text>
            <Text style={appStyles.subheadingText}>{language.accountsSub}</Text>
          </View>
          <Content enableOnAndroid style={appStyles.content}>
            <View style={appStyles.contentBgAccount}>
              <Tabs>
                <Tab heading="Tab1">
                  <Text>Tab 1111</Text>
                </Tab>
                <Tab heading="Tab2">
                  <Text>Tab 2222</Text>
                </Tab>
                <Tab heading="Tab3">
                  <Text>Tab 3333</Text>
                </Tab>
              </Tabs>
            </View>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);