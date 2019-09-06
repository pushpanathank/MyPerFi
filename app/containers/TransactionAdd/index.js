import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert, TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Screens, Strings, Theme } from '../../constants';
import { Logo, Svgicon, HeadersWithTitle, Text, Block, CurrencySymbol, Button, Input } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import {
  Container, Content
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import { accountActions } from "../../actions";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import AccountForm from './accountform';

class TransactionAdd extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const type = navigation.getParam('type');
    this.state = {
      type:type,
      accInitialValues: {id:null, name: "",no: "",bal: "",act: true},
    }
  }
  addAccount(values, dispatch, props){
    dispatch(accountActions.addBankAcc(values));
    showToast(props.language.added,"success");
    dispatch(NavigationActions.navigate({ routeName: Screens.Accounts.route }));
    Keyboard.dismiss();
  }
  addWallet(values, dispatch, props){
    dispatch(accountActions.addWalletAcc(values));
    showToast(props.language.added,"success");
    dispatch(NavigationActions.navigate({ routeName: Screens.Accounts.route }));
    Keyboard.dismiss();
  }

  removeAcc(){
    Alert.alert(
      this.props.language.confirm,
      this.props.language.delAccConfirm,
      [
        {
          text: this.props.language.cancel,
          onPress: () => {},
          style: 'cancel',
        },
        {text: this.props.language.okay, onPress: () => {
          this.props.removeAcc(this.state);
          showToast(this.props.language.deleted,"success");
          this.props.navigation.navigate(Screens.Accounts.route);
        }},
      ],
      {cancelable: false},
    );
  }

  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={language[this.state.type]} leftIcon={'back'}/>
          <View style={[appStyles.heading40]}>
          </View>
            <Input
              label="Email"
              leftIcon={<Svgicon 
              color={Theme.colors.white}
              name={'plus'} 
              width={18} 
              height={18} />}
              rightIcon={<Svgicon 
              color={Theme.colors.white}
              name={'plus'} 
              width={18} 
              height={18} />}
              borderColor={Theme.colors.white}
              activeBorderColor={Theme.colors.white}
              error={false}
              errorMessage={'Error message'}
              errorStyle={{color:'red'}}
              style={[styles.input]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Text>dfsdfsdf</Text>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
            <AccountForm onSubmit={this.addAccount} initialValues={this.state.accInitialValues}/>
          </Content>
        </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bankAcc: state.accounts.bankAcc,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
      pressSave: () => {
        dispatch(submit('accountForm'))
      },
      removeAcc: (state) =>{
        dispatch(accountActions.removeBankAcc(state.type));
      },
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TransactionAdd);