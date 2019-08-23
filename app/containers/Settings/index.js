import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens, Strings } from '../../constants';
import { Logo, Svgicon, Headers, IconList, MyText, Button, Block, Input, Text } from '../../components';
import imgs from '../../assets/images';
import {
  Container, Content, Icon, Spinner,
  Header, Left, Body, Title, Right, List, ListItem, Item, Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  
  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <View style={[appStyles.heading50]}>
            <Text style={appStyles.headingText}>{language.settings}</Text>
          </View>
          <Content enableOnAndroid style={[appStyles.contentBg]}>
            <List>
              <ListItem transparent noIndent 
                  onPress={() => this.props.selectedColor()}>                                
                  <Body>
                    <MyText text={language.chooseLang} />
                  </Body>
                  <Right>
                    <MyText text={'Estimated Bal'} size={11} color={Colors.lightBlack1}/>
                  </Right>
              </ListItem>
              <ListItem transparent noIndent 
                  onPress={() => this.props.selectedColor()}>                                
                  <Body>
                    <MyText text={language.chooseCurr} />
                  </Body>
                  <Right>
                    <MyText text={'Estimated Bal'} size={11} color={Colors.lightBlack1}/>
                  </Right>
              </ListItem>

              <ListItem>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    <Picker.Item label="Wallet" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                  </Picker>
                </Item>
              </ListItem>
            </List>

            <Button onPress={() => this.handleLogin()} color="secondary">
              <Text bold white center>Login</Text>
            </Button>

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
export default connect(mapStateToProps, mapDispatchToProps)(Settings);