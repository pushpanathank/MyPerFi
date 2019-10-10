import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Screens, Strings, Theme } from '../../constants';
import { Logo, Headers, Text, Block, CurrencySymbol, Button, Input, Icon, Switch, IconBack, IconButton } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { accountActions } from "../../actions";
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class AccountsManage extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const type = navigation.getParam('type');
    const id = navigation.getParam('id');
    if(id){
      let obj = this.props.accounts[id];
      this.state = {
        type:type,
        accId:id,
        accInputs: {
          name: { type: "genericRequired", value: obj.name },
          no: { type: "generic", value: obj.no },
          bal: { type: "integerRequired", value: obj.bal.toString() },
          act: { type: "bool", value: obj.act },
        },
        validForm: true,
      }
    }else{
      this.state = {
        type:type,
        accId:id,
        accInputs: {
          name: { type: "genericRequired", value: "" },
          no: { type: "generic", value: "" },
          bal: { type: "integerRequired", value: "" },
          act: { type: "bool", value: true },
        },
        validForm: true,
      }
    }

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addAccount = this.addAccount.bind(this);
  }
  addAccount(){
    this.getFormValidation({obj:'accInputs'});
    const { accInputs, accId, type } = this.state;
    const msg = accId ? this.props.language.updated: this.props.language.added;
    if(this.state.validForm){
      Keyboard.dismiss();
      const acc = {
        id:accId,
        name:accInputs.name.value,
        no: accInputs.no.value,
        bal: accInputs.bal.value,
        act: accInputs.act.value,
        type: type,
        sync: 1,
        del: 0,
      }
      // console.log("acc", acc);
      this.props.addAcc(acc);
      showToast(msg,"success");
      this.props.navigation.navigate(Screens.Accounts.route);
    }
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
          <Headers 
            {...this.props} 
            title={language.accounts} 
            leftIcon={<IconBack />} 
            rightIcon={<IconButton icon={'tick'} onPress={this.addAccount} />} 
            />
          <View style={[appStyles.heading40]}>
          { this.state.accId ? 
            <Text title color='white'>{this.state.type ? language.editWallet : language.editBankacc}</Text> : 
            <Text title color='white'>{this.state.type ? language.addWallet : language.addBankacc}</Text>
          }
          </View>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
            <View>
              <Block block>
                <Text gray>{this.state.type ? language.walName: language.accName}</Text>
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
              { !this.state.type ?
                <View>
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
                </View>:  <View />
              }
              <Block block>
                <Text gray>{this.state.type ? language.walBal: language.accBal}</Text>
              </Block>
              <Block column>
                <Input
                  leftIcon={<CurrencySymbol size='h2'/>}
                  leftIconStyle={{bottom:Theme.sizes.indent}}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('accInputs', 'bal', 'accBal')}
                  errorStyle={{bottom: -Theme.sizes.indentsmall}}
                  returnKeyType={"next"}
                  keyboardType={"decimal-pad"}
                  value={accInputs.bal.value}
                  onChangeText={value => {this.onInputChange({ field: "bal", value, obj:'accInputs' });}}
                  style={{marginBottom:Theme.sizes.indent}}
                />
              </Block>
              <Block row center space="between" style={{marginTop: Theme.sizes.indenthalf}}>
                <Text gray>{this.state.type ? language.walAct : language.accAct}?</Text>
                <Switch
                  value={accInputs.act.value}
                  onValueChange={value => {this.onInputChange({ field: "act", value, obj:'accInputs' });}}
                />
              </Block>
            </View>
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
    accounts: state.accounts.items,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
      addAcc: (values) => dispatch(accountActions.addAcc(values)),
      removeAcc: (state) =>{
        dispatch(accountActions.removeAcc(state.accId));
      },
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AccountsManage);