import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert, TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Screens, Strings, Theme } from '../../constants';
import { Logo, Svgicon, HeadersWithTitle, Text, Block, CurrencySymbol, Button, Input, Ripple } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import {
  Container, Content
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import { accountActions } from "../../actions";
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class TransactionAdd extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const type = navigation.getParam('type');
    this.state = { 
      type:type,
      transInputs: {
        amount: {
          type: "integer",
          value: ""
        },
      },
      validForm: true,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }
  addTransaction(){

  }

  render(){
    const {language} = this.props;
    const { transInputs } = this.state;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={language[this.state.type]} leftIcon={'back'}/>
          <Block flex={false} style={[appStyles.heading60]} shadow>
            <Block column padding={[0,Theme.sizes.indent2x]}>
              <Input
                textColor={Theme.colors.white}
                fontSize={Theme.sizes.h4}
                placeholder={"Enter Amount"}
                leftIcon={<CurrencySymbol size='h3' color={Theme.colors.white}/>}
                borderColor={'transparent'}
                activeBorderColor={'transparent'}
                selectionColor={Theme.colors.white}
                error={this.renderError('transInputs', 'amount', 'email')}
                returnKeyType={"next"}
                keyboardType={"numeric"}
                value={transInputs.amount.value}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
            </Block>
          </Block>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
            <Block column>
              <Input
                placeholder={"Where did you spend?"}
                leftIcon={<Svgicon name='shop' width='20' color={Theme.colors.gray3}/>}
                borderColor={Theme.colors.black}
                error={this.renderError('transInputs', 'amount', 'email')}
                returnKeyType={"next"}
                value={transInputs.amount.value}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
              <Input
                placeholder={"Thu, 10 Sep, 2019"}
                placeholderTextColor={Theme.colors.black}
                leftIcon={<Svgicon name='calendar' width='20' color={Theme.colors.gray3}/>}
                borderColor={Theme.colors.black}
                error={this.renderError('transInputs', 'amount', 'email')}
                returnKeyType={"next"}
                value={transInputs.amount.value}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
            </Block>
            <Ripple>
              <Block row>
                <Svgicon name='calendar' width='20' color={Theme.colors.gray3}/>
                <Text>Thu, 10 Sep, 2019</Text>
              </Block>
            </Ripple>

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
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TransactionAdd);