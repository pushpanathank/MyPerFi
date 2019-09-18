import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Screens, Strings, Theme } from '../../constants';
import { Logo, HeadersWithTitle, Text, Block, CurrencySymbol, Button, Input, Icon, Switch } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import { accountActions } from "../../actions";
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';
import AccountForm from './accountform';
import WalletForm from './walletform';

class AccountsManage extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const activeTab = navigation.getParam('activeTab');
    const accId = navigation.getParam('accId');
    this.state = {
      activeTab:activeTab,
      accId:accId,
      walInitialValues: accId ? this.props.walletAcc[accId] : {id:null, name: "",bal: "",act: true},
      accInitialValues: accId ? this.props.bankAcc[accId] : {id:null, name: "",no: "",bal: "",act: true},
      accInputs: {
        name: { type: "genericRequired", value: "" },
        no: { type: "generic", value: "" },
        bal: { type: "integer", value: "" },
        act: { type: "bool", value: true },
      },
      validForm: true,
    }
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }
  addAccount(){
    this.getFormValidation({obj:'accInputs'});
    const { accInputs } = this.state;
    if(this.state.validForm){
      /*const trans = {
        id:this.state.id,
        type:this.state.type,
        cat: this.state.category,
        amount: transInputs.amount.value,
        place: transInputs.place.value,
        date: formatDate({date:selectedDate, format:'save'}),
        spend: transInputs.spend.value,
        reimb: transInputs.reimb.value,
        note: transInputs.note.value,
      }
      console.log("trans", trans);
      this.props.addTrans(trans);
      showToast(msg,"success");
      this.props.navigation.navigate(Screens.Home.route);
      Keyboard.dismiss();*/
    }
  }
/*  addAccount(values, dispatch, props){
    dispatch(accountActions.addBankAcc(values));
    showToast(props.language.added,"success");
    dispatch(NavigationActions.navigate({ routeName: Screens.Accounts.route }));
    Keyboard.dismiss();
  }
*/  addWallet(values, dispatch, props){
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
    const {accInputs} = this.state;
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={language.accounts} leftIcon={'back'} rightIcon={'tick'} onPressRight={this.addAccount}/>
          <View style={[appStyles.heading40]}>
          { this.state.accId ? 
            <Text title color='white'>{this.state.activeTab ? language.editWallet : language.editBankacc}</Text> : 
            <Text title color='white'>{this.state.activeTab ? language.addWallet : language.addBankacc}</Text>
          }
          </View>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
          { this.state.activeTab ? 
            <WalletForm onSubmit={this.addWallet} initialValues={this.state.walInitialValues}/> :
            <View>
              <Block block>
                <Text gray>{language.accName}</Text>
              </Block>
              <Block column>
                <Input
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('accInputs', 'name', 'accName')}
                  errorStyle={{bottom: -Theme.sizes.indentsmall}}
                  returnKeyType={"next"}
                  value={accInputs.name.value}
                  onChangeText={value => {this.onInputChange({ field: "name", value, obj:'accInputs' });}}
                  style={{marginBottom:Theme.sizes.indent}}
                />
              </Block>
              <Block block>
                <Text gray>{language.accNo} ({language.last4})</Text>
              </Block>
              <Block column>
                <Input
                  placeholder={language.accNoEx}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('accInputs', 'no', 'accNo')}
                  returnKeyType={"next"}
                  keyboardType={"numeric"}
                  value={accInputs.no.value}
                  onChangeText={value => {this.onInputChange({ field: "no", value, obj:'accInputs' });}}
                  style={{marginBottom:Theme.sizes.indent}}
                />
              </Block>
              <Block block>
                <Text gray>{language.accBal}</Text>
              </Block>
              <Block column>
                <Input
                  leftIcon={<CurrencySymbol size='h2'/>}
                  leftIconStyle={{bottom:Theme.sizes.indent}}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('accInputs', 'bal', 'accBal')}
                  errorStyle={{bottom: -Theme.sizes.indentsmall}}
                  returnKeyType={"next"}
                  keyboardType={"numeric"}
                  value={accInputs.bal.value}
                  onChangeText={value => {this.onInputChange({ field: "bal", value, obj:'accInputs' });}}
                  style={{marginBottom:Theme.sizes.indent}}
                />
              </Block>
              <Block row center space="between" style={{marginTop: Theme.sizes.indenthalf}}>
                <Text gray>{language.accAct}?</Text>
                <Switch
                  value={accInputs.act.value}
                  onValueChange={value => {this.onInputChange({ field: "act", value, obj:'accInputs' });}}
                />
              </Block>
            </View>
          }
          { this.state.accId ? 
            <Block center middle row margin={[Theme.sizes.indent,0]}>
              <Button color="accent" block 
                onPress={() => { this.removeAcc() }}
                >
                <Text white center>{language.delete}</Text>
              </Button>
            </Block> :
            <Text />
          }
          </Content>
        </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bankAcc: state.accounts.bankAcc,
    walletAcc: state.accounts.walletAcc,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
      onPressRight: () => {
        if(props.navigation.getParam('activeTab')){
          dispatch(submit('walletForm'))
        }else{
          dispatch(submit('accountForm'))
        }
      },
      removeAcc: (state) =>{
        if(state.activeTab){
          dispatch(accountActions.removeWalletAcc(state.accId));
        }else{
          dispatch(accountActions.removeBankAcc(state.accId));
        }
      },
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AccountsManage);