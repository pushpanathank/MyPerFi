import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Picker, Alert} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from "react-native-modal-datetime-picker";

import { Theme, Screens, ActionTypes, IconList } from '../../constants';
import { Headers, Block, Icon, IconMenu, IconButton, Text, Button, Ripple, Input, Switch, CurrencySymbol, IconBillsList } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import {
  Container,
  Content,
} from 'native-base';
import { connect } from "react-redux";
import { billActions } from "../../actions/";
import { validationService } from '../../utils/validation';
import { formatDate } from '../../utils/accounts';
import appStyles from '../../theme/appStyles';
import styles from './styles';

const iconBills = IconList.iconBills;

class BillsManage extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    if(id){
      let obj = this.props.bills[id];
      this.state = {
        billId: id,
        cyc: obj.cyc,
        selectedDate: new Date(obj.date),
        type: obj.type,
        billInputs: {
          name: { type: "genericRequired", value: obj.name },
          accNo: { type: "generic", value: obj.accNo },
          amount: { type: "integerRequired", value: obj.amount },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode, date:obj.date}) },
          autoGen: { type: "bool", value: obj.autoGen },
          inact: { type: "bool", value: obj.inact },
        },
        validForm: true,
        visibleDatePicker: false,
        visibleIconModal: false,
      }
    }else{
      this.state = {
        billId:0,
        cyc: 30,
        selectedDate: new Date(),
        type: 'others',
        billInputs: {
          name: { type: "genericRequired", value: "" },
          accNo: { type: "generic", value: "" },
          amount: { type: "integerRequired", value: "" },
          date: { type: "generic", value: formatDate({lang:this.props.languageCode}) },
          autoGen: { type: "bool", value: false },
          inact: { type: "bool", value: false },
        },
        validForm: true,
        visibleDatePicker: false,
        visibleIconModal: false,
      }
    }
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addBiller = this.addBiller.bind(this);
  }
  addBiller(){
    this.getFormValidation({obj:'billInputs'});
    const { billInputs, type, selectedDate, cyc, billId } = this.state;
    const msg = billId ? this.props.language.updated: this.props.language.added;
    if(this.state.validForm){
      Keyboard.dismiss();
      const bill = {
        id:billId,
        name:billInputs.name.value,
        accNo: billInputs.accNo.value,
        type: type,
        cyc: cyc,
        amount: billInputs.amount.value,
        date: formatDate({date:selectedDate, format:'save'}),
        autoGen: billInputs.autoGen.value,
        inact: billInputs.inact.value,
        sync: 1,
      }
      console.log("bill", bill);
      this.props.addBiller(bill);
      showToast(msg,"success");
      this.props.navigation.navigate(Screens.Bills.route);
    }
  }

  removeBill(){
    Alert.alert(
      this.props.language.confirm,
      this.props.language.delBillConfirm,
      [
        {
          text: this.props.language.cancel,
          onPress: () => {},
          style: 'cancel',
        },
        {text: this.props.language.okay, onPress: () => {
          this.props.removeBiller(this.state);
          showToast(this.props.language.deleted,"success");
          this.props.navigation.navigate(Screens.Bills.route);
        }},
      ],
      {cancelable: false},
    );
  }
  toggleIconModal = () => {
    this.setState({visibleIconModal: !this.state.visibleIconModal});
  }

  selectedType = (type)=>{
    this.setState({type:type.icon});
    this.toggleIconModal();
  }

  toggleDatePicker = () => {
    Keyboard.dismiss();
    this.setState({visibleDatePicker: !this.state.visibleDatePicker});
  }
  handleDatePicked = date => {
    let { billInputs } = this.state;
    billInputs.date.value = formatDate({lang:this.props.languageCode,date:date});
    this.toggleDatePicker();
    this.setState({billInputs: billInputs, selectedDate: date});
  };

  render(){
    const {language} = this.props;
    const {billInputs, cyc} = this.state;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconMenu {...this.props} />} 
            rightIcon={<IconButton icon={'tick'} onPress={this.addBiller} />}
            />
          <View style={[appStyles.heading40,{paddingTop:0}]}>
            <Text h3 white light>{language.manageBills}</Text>
          </View>
          <Content enableOnAndroid style={[appStyles.contentBg, styles.container]}>
            <Block block>
              <Text gray>{language.billerName}</Text>
            </Block>
            <Block column>
              <Input
                borderColor={Theme.colors.gray2}
                error={this.renderError('billInputs', 'name', 'billerName')}
                errorStyle={styles.errorStyle}
                returnKeyType={"next"}
                value={billInputs.name.value}
                onChangeText={value => {this.onInputChange({ field: "name", value, obj:'billInputs' });}}
                style={{marginBottom:Theme.sizes.indent}}
              />
            </Block>
            <Block block>
              <Text gray>{language.billerAcc}</Text>
            </Block>
            <Block column>
              <Input
                borderColor={Theme.colors.gray2}
                error={this.renderError('billInputs', 'accNo', 'billerAcc')}
                errorStyle={styles.errorStyle}
                returnKeyType={"next"}
                keyboardType={"decimal-pad"}
                value={billInputs.accNo.value}
                onChangeText={value => {this.onInputChange({ field: "accNo", value, obj:'billInputs' });}}
                style={{marginBottom:Theme.sizes.indent}}
              />
            </Block>
            <Block block>
              <Text gray>{language.billerType}</Text>
            </Block>
            <Ripple onPress={()=>this.toggleIconModal()} style={[styles.borderBottom,{marginBottom:Theme.sizes.indent, paddingTop: Theme.sizes.indent}]}>
              <Block row center>
                <Icon name={this.state.type} size='22' color={Theme.colors.white} style={[styles.typeIcon,{backgroundColor: iconBills[this.state.type].color}]}/>
                <Text>{language[this.state.type]}</Text>
              </Block>
            </Ripple>
            <Block block>
              <Text gray>{language.billAmt}</Text>
            </Block>
            <Block column>
                <Input
                  leftIcon={<CurrencySymbol size='h2'/>}
                  leftIconStyle={{bottom:Theme.sizes.indent}}
                  borderColor={Theme.colors.gray2}
                  error={this.renderError('billInputs', 'amount', 'billAmt')}
                  errorStyle={styles.errorStyle}
                  returnKeyType={"next"}
                  keyboardType={"decimal-pad"}
                  value={billInputs.amount.value}
                  onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'billInputs' });}}
                  style={{marginBottom:Theme.sizes.indent}}
                />
            </Block>
            <Block block>
              <Text gray>{language.dueDate}</Text>
            </Block>
            <Block column>
              <Ripple onPress={()=>this.toggleDatePicker()} style={[styles.borderBottom,{marginBottom:Theme.sizes.indent, padding: Theme.sizes.indent}]}>
                <Block row center>
                  <Icon name='calendar' size='22' color={Theme.colors.black} style={{marginRight:Theme.sizes.indent}}/>
                  <Text>{billInputs.date.value}</Text>
                </Block>
              </Ripple>
            </Block>
            <Block block>
              <Text gray>{language.billCycle}</Text>
            </Block>
            <Block column style={styles.borderBottom}>
              <Picker
                selectedValue={cyc}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue, itemIndex) =>{
                  this.setState({cyc:itemValue});
                }
                }>
                <Picker.Item key={1} label={`${language.daily}`} value={1} />
                <Picker.Item key={7} label={`${language.weekly}`} value={7} />
                <Picker.Item key={30} label={`${language.monthly}`} value={30} />
                <Picker.Item key={90} label={`${language.quarterly}`} value={90} />
                <Picker.Item key={180} label={`${language.halfyearly}`} value={180} />
                <Picker.Item key={365} label={`${language.yearly}`} value={365} />
              </Picker>
            </Block>
            <Block row center space="between" style={{marginTop: Theme.sizes.indent}}>
              <Text gray>{language.autoGenerate}?</Text>
              <Switch
                value={billInputs.autoGen.value}
                onValueChange={value => {this.onInputChange({ field: "autoGen", value, obj:'billInputs' });}}
              />
            </Block>
            <Block row center space="between" style={{marginTop: Theme.sizes.indent, marginBottom: Theme.sizes.indent3x}}>
              <Text gray>{language.inactive}?</Text>
              <Switch
                value={billInputs.inact.value}
                onValueChange={value => {this.onInputChange({ field: "inact", value, obj:'billInputs' });}}
              />
            </Block>
            { this.state.billId ? 
              <Block center middle row margin={[Theme.sizes.indent,0]}>
                <Button color="accent" block 
                  onPress={() => { this.removeBill() }}
                  >
                  <Text white center>{language.delete}</Text>
                </Button>
              </Block> :
              <Text />
            }
          </Content>

          <DateTimePicker
            isVisible={this.state.visibleDatePicker}
            onConfirm={this.handleDatePicked}
            onCancel={this.toggleDatePicker}
            is24Hour={false}
            date={this.state.selectedDate}
          />

          <Modal
              isVisible={this.state.visibleIconModal}
              backdropOpacity={ 0.5 }
              animationIn={ 'slideInUp' }
              animationOut={ 'slideOutDown' }
              onBackdropPress={ () => { this.toggleIconModal(); } }
              onBackButtonPress={ () => { this.toggleIconModal(); } }
              style={{}}
              useNativeDriver
            > 
              <View style={[appStyles.modalContent,{width:'80%', left:'10%', padding: 0}]}>
              <View style={{height:Theme.sizes.indent6x*3.2, width:'100%'}}>
                  <IconBillsList selectedType={this.selectedType}/>
                </View>
              </View>
            </Modal>

         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    languageCode: state.settings.languageCode,
    language: getLanguage(state.settings.languageId),
    bills: state.bills.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBiller : (values) => dispatch(billActions.addBiller(values)),
    removeBiller: (state) =>{
        dispatch(billActions.removeBiller(state.billId));
      }
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BillsManage);