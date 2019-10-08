import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';

import { Screens, Strings, Theme } from '../../constants';
import { Headers, Text, Block, CurrencySymbol, Button, Input, Icon, Switch, IconBack, IconButton, SelectAccount, Ripple } from '../../components';
import { getLanguage, showToast, generateUUIDInt } from '../../utils/common';
import { formatDate } from '../../utils/accounts';
import imgs from '../../assets/images';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { accountActions } from "../../actions";
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class AccountsTransfer extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const transid = navigation.getParam('transid')||0;
    if(transid != 0){
      let obj = this.props.transactions[transid];
      this.state = {
        id:transid,
        selectedDate: new Date(obj.date),
        type: 2,
        category: obj.cat,
        initAmt: obj.amount,
        transInputs: {
          frmAcc: { type: "genericRequired", value: obj.frmAcc },
          toAcc: { type: "genericRequired", value: obj.toAcc },
          amount: { type: "integerRequired", value: obj.amount.toString() },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode, date:obj.date}) },
          note: { type: "generic", value: obj.note },
        },
        validForm: true,
        from:0,
        selectAccModal: false,
        visibleDatePicker: false
      }
    }else{
      this.state = {
        id:transid,
        selectedDate: new Date(),
        type: 2,
        category: 'transfer',
        initAmt: 0,
        transInputs: {
          frmAcc: { type: "genericRequired", value: '' },
          toAcc: { type: "genericRequired", value: '' },
          amount: { type: "integerRequired", value: '' },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode}) },
          note: { type: "generic", value: '' },
        },
        validForm: true,
        from:0,
        selectAccModal: false,
        visibleDatePicker: false
      }
    }

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.accTransfer = this.accTransfer.bind(this);
    this.removeTransfer = this.removeTransfer.bind(this);
  }

  toggleAccModal = (from) => {
    Keyboard.dismiss();
    this.setState({selectAccModal: !this.state.selectAccModal, from:from});
  }

  selectAccount = (type,transid,accid)=>{
    this.toggleAccModal(this.state.from);
    let { transInputs } = this.state;
    if(this.state.from){
      transInputs.frmAcc.value=accid;
    }else{
      transInputs.toAcc.value=accid;
    }
    if(transInputs.frmAcc.value==transInputs.toAcc.value && (transInputs.frmAcc.value!='' || transInputs.toAcc.value!='')){
      if(this.state.from){
        transInputs.frmAcc.value='';
      }else{
        transInputs.toAcc.value='';
      }
      showToast(this.props.language.sameAccError,"danger");
    }
    this.setState({transInputs: transInputs});
  }

  toggleDatePicker = () => {
    Keyboard.dismiss();
    this.setState({visibleDatePicker: !this.state.visibleDatePicker});
  }

  handleDatePicked = date => {
    let { transInputs } = this.state;
    transInputs.date.value = formatDate({lang:this.props.languageCode,date:date});
    this.toggleDatePicker();
    this.setState({transInputs: transInputs, selectedDate: date});
  };

  accTransfer(){
    this.getFormValidation({obj:'transInputs'});
    const { transInputs, id, selectedDate } = this.state;
    const msg = id ? this.props.language.updated: this.props.language.added;
    if(this.state.validForm){
      Keyboard.dismiss();
      const trans = this.getTransactionObj();
      // console.log("trans", trans);
      this.props.addTransfer(trans);
      showToast(msg,"success");
      this.props.navigation.navigate(Screens.Accounts.route);
    }
  }

  getTransactionObj = ()=>{
    const { accounts } = this.props;
    const { transInputs, selectedDate } = this.state;
    return {
        id:this.state.id,
        frmAcc:transInputs.frmAcc.value,
        toAcc:transInputs.toAcc.value,
        type:this.state.type,
        cat: this.state.category,
        initAmt: this.state.initAmt,
        amount: transInputs.amount.value,
        place: accounts[transInputs.frmAcc.value].name + ' -> ' + accounts[transInputs.toAcc.value].name,
        date: formatDate({date:selectedDate, format:'save'}),
        ts: generateUUIDInt(selectedDate),
        spend: false,
        reimb: false,
        note: transInputs.note.value,
        sync: 1,
      }
  }

  removeTransfer(){
    const {language} = this.props;
    Alert.alert(
      language.confirm,
      language.delTransConfirm,
      [
        {
          text: language.cancel,
          onPress: () => {},
          style: 'cancel',
        },
        {text: this.props.language.okay, onPress: () => {
          const trans = this.getTransactionObj();
          this.props.removeTransfer(trans);
          showToast(this.props.language.deleted,"success");
          this.props.navigation.navigate(Screens.Accounts.route);
        }},
      ],
      {cancelable: false},
    );
  }

  _renderRightButton = ()=> {
    if(this.state.id!=0){
      return (<Block row>
        <IconButton icon={'delete'} onPress={this.removeTransfer} size={20} />
        <IconButton icon={'tick'} onPress={this.accTransfer} />
        </Block>);
    }else{
      return (<Block row>
        <IconButton icon={'tick'} onPress={this.accTransfer} />
        </Block>);
    }
  }
  _renderError(error) {
    return (<Animatable.Text animation="wobble" duration={500} useNativeDriver style={[appStyles.inputError,styles.error]}>{error}</Animatable.Text>)
  }

  render(){
    const {transInputs} = this.state;
    const {language, accounts} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconBack />} 
            rightIcon={this._renderRightButton()} 
            rightFlex={this.state.id!=0 ? 2:1}
            />
          <View style={[appStyles.heading40]}>
            <Text title color='white'>{language.accTransfer}</Text>
          </View>

          <SelectAccount 
            isVisible={this.state.selectAccModal}
            toggleModal={this.toggleAccModal}
            onSelect={this.selectAccount}
            />

          <DateTimePicker
            isVisible={this.state.visibleDatePicker}
            onConfirm={this.handleDatePicked}
            onCancel={this.toggleDatePicker}
            is24Hour={false}
            date={this.state.selectedDate}
          />

          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
            <View>
              <Block block>
                <Text gray>{language.fromAcc}</Text>
              </Block>
              <Ripple onPress={()=>this.toggleAccModal(1)}>
                <Block row center style={appStyles.listItem}>
                  <Icon name='wallet' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{accounts[transInputs.frmAcc.value] ? accounts[transInputs.frmAcc.value].name : language.selectAcc}</Text>
                  {this._renderError(this.renderError('transInputs', 'frmAcc', 'fromAcc'))}
                </Block>
              </Ripple>
              <Block block style={styles.inputRow}>
                <Text gray>{language.amount}</Text>
              </Block>
              <Block column>
                <Input
                  leftIcon={<CurrencySymbol size='h2' style={{bottom:-15}}/>}
                  leftIconStyle={{bottom:Theme.sizes.indent}}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('transInputs', 'amount', 'amount')}
                  errorStyle={styles.error}
                  returnKeyType={"next"}
                  keyboardType={"decimal-pad"}
                  value={transInputs.amount.value}
                  onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
                />
              </Block>
              <Block block center middle style={{marginVertical:Theme.sizes.indent}}>
                <Icon name="sort" size={30} color={Theme.colors.secondary} />
              </Block>
              <Block block>
                <Text gray>{language.toAcc}</Text>
              </Block>
              <Ripple onPress={()=>this.toggleAccModal(0)}>
                <Block row center style={appStyles.listItem}>
                  <Icon name='wallet' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{accounts[transInputs.toAcc.value] ? accounts[transInputs.toAcc.value].name : language.selectAcc}</Text>
                  {this._renderError(this.renderError('transInputs', 'toAcc', 'toAcc'))}
                </Block>
              </Ripple>
              <Block block style={styles.inputRow}>
                <Text gray>{language.selectDate}</Text>
              </Block>
              <Ripple onPress={()=>this.toggleDatePicker()}>
                <Block row center style={appStyles.listItem}>
                  <Icon name='calendar' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{transInputs.date.value}</Text>
                </Block>
              </Ripple>
            <Block block style={styles.inputRow}>
              <Text gray>{`${language['addNote']} (${language['optional']})`}</Text>
            </Block>
            <Block column style={{marginBottom:Theme.sizes.indent6x}}>
              <Input
                leftIcon={<Icon name='addnote' size='20' color={Theme.colors.gray3}/>}
                borderColor={Theme.colors.gray2}
                error={this.renderError('transInputs', 'note', 'addNote')}
                returnKeyType={"next"}
                value={transInputs.note.value}
                onChangeText={value => {this.onInputChange({ field: "note", value, obj:'transInputs' });}}
                style={{marginBottom:0}}
              />
            </Block>
            </View>
          </Content>
        </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    languageCode: state.settings.languageCode,
    accounts: state.accounts.items,
    language: getLanguage(state.settings.languageId),
    transactions: state.transactions.items,
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
      addTransfer: (values) => dispatch(accountActions.addTransfer(values)),
      removeTransfer: (trans) =>{
        dispatch(accountActions.removeTransfer(trans));
      },
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AccountsTransfer);