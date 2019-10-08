import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";

import { Screens, Strings, Theme } from '../../constants';
import { Headers, Text, Block, CurrencySymbol, Button, Input, Icon, Switch, IconBack, IconButton, SelectAccount, Ripple } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
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
    const id = navigation.getParam('id');
    if(id){
      let obj = this.props.accounts[id];
      this.state = {
        accId:id,
        transInputs: {
          frmAcc: { type: "genericRequired", value: obj.name },
          toAcc: { type: "genericRequired", value: obj.name },
          amount: { type: "integerRequired", value: obj.bal.toString() },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode}) },
          note: { type: "generic", value: "" },
        },
        validForm: true,
        type:0,
        selectAccModal: false,
        visibleDatePicker: false
      }
    }else{
      this.state = {
        accId:id,
        transInputs: {
          frmAcc: { type: "genericRequired", value: '' },
          toAcc: { type: "genericRequired", value: '' },
          amount: { type: "integerRequired", value: '' },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode}) },
          note: { type: "generic", value: '' },
        },
        validForm: true,
        type:0,
        selectAccModal: false,
        visibleDatePicker: false
      }
    }

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.accTransfer = this.accTransfer.bind(this);
  }

  toggleAccModal = (type) => {
    console.log("type", type);
    this.setState({selectAccModal: !this.state.selectAccModal, type:type});
  }

  selectAccount = (type,transid,accid)=>{
    this.toggleAccModal(this.state.type);
    let { transInputs } = this.state;
    if(transInputs.frmAcc.value==transInputs.toAcc.value){
      showToast(this.props.language.sameAccError,"danger");
      return;
    }else{
      if(this.state.type){
        transInputs.toAcc.value=accid;
      }else{
        transInputs.frmAcc.value=accid;
      }
    }
    this.setState({transInputs: transInputs});
  }

  toggleDatePicker = () => {
    Keyboard.dismiss();
    this.setState({visibleDatePicker: !this.state.visibleDatePicker});
  }

  handleDatePicked = date => {
    console.log("date", date);
    let { transInputs } = this.state;
    transInputs.date.value = formatDate({lang:this.props.languageCode,date:date});
    this.toggleDatePicker();
    this.setState({transInputs: transInputs, selectedDate: date});
  };

  accTransfer(){
    this.getFormValidation({obj:'transInputs'});
    const { transInputs, accId, activeTab } = this.state;
    const msg = accId ? this.props.language.updated: this.props.language.added;
    if(this.state.validForm){
      Keyboard.dismiss();
      const acc = {
        id:accId,
        name:transInputs.name.value,
        no: transInputs.no.value,
        bal: transInputs.bal.value,
        act: transInputs.act.value,
        type: activeTab,
        sync: 1,
      }
      console.log("acc", acc);
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
            rightIcon={<IconButton icon={'tick'} onPress={this.accTransfer} />} 
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
              <Ripple onPress={()=>this.toggleAccModal(0)}>
                <Block row center style={appStyles.listItem}>
                  <Icon name='wallet' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{accounts[transInputs.frmAcc.value] ? accounts[transInputs.frmAcc.value].name : language.selectAcc}</Text>
                  <Text>{this.renderError('transInputs', 'frmAcc', 'fromAcc')}</Text>
                </Block>
              </Ripple>
              <Block block style={styles.inputRow}>
                <Text gray>{language.amount}</Text>
              </Block>
              <Block column>
                <Input
                  leftIcon={<CurrencySymbol size='h2'/>}
                  leftIconStyle={{bottom:Theme.sizes.indent}}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('transInputs', 'amount', 'amount')}
                  errorStyle={{bottom: -Theme.sizes.indentsmall}}
                  returnKeyType={"next"}
                  keyboardType={"decimal-pad"}
                  value={transInputs.amount.value}
                  onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
                />
              </Block>
              <Block block center middle style={{marginVertical:Theme.sizes.indent}}>
                <Icon name="transfer" size={23} color={Theme.colors.secondary} />
              </Block>
              <Block block>
                <Text gray>{language.toAcc}</Text>
              </Block>
              <Ripple onPress={()=>this.toggleAccModal(1)}>
                <Block row center style={appStyles.listItem}>
                  <Icon name='wallet' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{accounts[transInputs.toAcc.value] ? accounts[transInputs.toAcc.value].name : language.selectAcc}</Text>
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
            <Block column>
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
    languageCode: state.settings.languageCode,
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
export default connect(mapStateToProps, mapDispatchToProps)(AccountsTransfer);