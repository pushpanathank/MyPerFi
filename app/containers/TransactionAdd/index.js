import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert, TextInput, Modal} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import Modal from 'react-native-modal';

import { Screens, Strings, Theme } from '../../constants';
import { Logo, Svgicon, HeadersWithTitle, Text, Block, CurrencySymbol, Button, Input, Ripple, Switch, IconList } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import { getDateWithTime, getDate } from '../../utils/accounts';
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
        amount: { type: "integer", value: "" },
        place: { type: "generic", value: "" },
        date: { type: "generic", value: "" },
        spend: { type: "bool", value: true },
        reimb: { type: "bool", value: false },
        note: { type: "generic", value: "" },
      },
      validForm: true,
      visibleIconModal: false
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }

  toggleIconModal = () => {
    console.log("toggleIconModal");
    this.setState({visibleIconModal: !this.state.visibleIconModal});
  }

  addTransaction(){
console.log("this.state", this.state);
    this.getFormValidation({obj:'transInputs'});

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
          <Button ripple shadow color="secondary" 
            onPress= {()=> this.addTransaction() }
            rippleContainerBorderRadius={Theme.sizes.indent3x} 
            style={[appStyles.btnCircle, appStyles.btnShadow,{position:'absolute', right: Theme.sizes.indent,zIndex:999, top: Theme.sizes.moderateScale(160)}]}>
            <Svgicon name='tick' width='20' color={Theme.colors.white} />
          </Button>
          <Block flex={false} style={[appStyles.heading125]} shadow>
            <Block row center padding={[0,Theme.sizes.indent1x]}>
              <Button center
                onPress={() => this.toggleIconModal()}
                style={[appStyles.catIcon,appStyles.catIconMid,{backgroundColor:Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}]}
                >
                <Svgicon 
                  color={Theme.colors.white} 
                  name={'exclamation'} 
                  width={18} 
                  height={18} />
              </Button>
              <Block>
                <Ripple onPress={() => this.toggleIconModal()} style={{padding:Theme.sizes.indenthalf}}>
                  <Text title white>{language['selectCat']}  </Text>
                  <Text caption gray2>{getDate(this.props.languageCode)}</Text>
                </Ripple>
              </Block>
            </Block>
            <Block column padding={[0,Theme.sizes.indent3x]}>
              <Input
                textColor={Theme.colors.white}
                fontSize={Theme.sizes.h4}
                placeholder={language['enterAmt']}
                leftIcon={<CurrencySymbol size='h3' color={Theme.colors.white}/>}
                borderColor={'transparent'}
                activeBorderColor={'transparent'}
                selectionColor={Theme.colors.white}
                error={this.renderError('transInputs', 'amount', 'amount', 1)}
                errorStyle={'toast'}
                returnKeyType={"next"}
                keyboardType={"numeric"}
                value={transInputs.amount.value}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
            </Block>
          </Block>
          <Content enableOnAndroid style={[appStyles.contentBg,appStyles.contentBg125, styles.container]}>
            <Block column>
              <Input
                placeholder={language['whereSpend']}
                leftIcon={<Svgicon name='shop' width='20' color={Theme.colors.gray3}/>}
                borderColor={Theme.colors.gray2}
                error={this.renderError('transInputs', 'place', 'email')}
                returnKeyType={"next"}
                value={transInputs.place.value}
                onChangeText={value => {this.onInputChange({ field: "place", value, obj:'transInputs' });}}
                style={{marginBottom:0}}
              />
            </Block>
            <Ripple>
              <Block row center style={appStyles.listItem}>
                <Svgicon name='calendar' width='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{getDate(this.props.languageCode)}</Text>
              </Block>
            </Ripple>
            <Block row center space="around" style={appStyles.listItem}>
              <Block row center>
                <Svgicon name='spend' width='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{language['spend']}</Text>
                </Block>
              <Switch
                value={transInputs.spend.value}
                onValueChange={value => {this.onInputChange({ field: "spend", value, obj:'transInputs' });}}
              />
            </Block>
            <Block row center space="around" style={appStyles.listItem}>
              <Block row center>
                <Svgicon name='reimburse' width='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{language['reimbursable']}</Text>
                </Block>
              <Switch
                value={transInputs.reimb.value}
                onValueChange={value => {this.onInputChange({ field: "reimb", value, obj:'transInputs' });}}
              />
            </Block>
            <Block column>
              <Input
                placeholder={`${language['addNote']} (${language['optional']})`}
                leftIcon={<Svgicon name='addnote' width='20' color={Theme.colors.gray3}/>}
                borderColor={Theme.colors.gray2}
                error={this.renderError('transInputs', 'note', 'addNote')}
                returnKeyType={"next"}
                value={transInputs.note.value}
                onChangeText={value => {this.onInputChange({ field: "note", value, obj:'transInputs' });}}
                style={{marginBottom:0}}
              />
            </Block>
            <Ripple>
              <Block row center style={appStyles.listItem}>
                <Svgicon name='uploadbill' width='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{`${language['addBill']} (${language['optional']})`}</Text>
              </Block>
            </Ripple>

          </Content>

          <Modal
              visible={this.state.visibleIconModal}
              animationType="slide"
              onRequestClose={() => {this.toggleIconModal() }}>
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
    bankAcc: state.accounts.bankAcc,
    languageCode: state.settings.languageCode,
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