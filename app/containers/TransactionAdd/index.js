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
          <Block flex={false} style={[appStyles.heading60]}>
            <Input
                textColor={Theme.colors.white}
                leftIcon={<CurrencySymbol size='h3' color={Theme.colors.white}/>}
                borderColor={Theme.colors.white}
                activeBorderColor={Theme.colors.white}
                error={this.renderError('transInputs', 'amount', 'email')}
                returnKeyType={"next"}
                value={transInputs.amount.value}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
          </Block>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>

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