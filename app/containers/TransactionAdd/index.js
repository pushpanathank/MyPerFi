import React from 'react'
import { StyleSheet, View, ImageBackground, Keyboard, Alert, TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Modal from 'react-native-modal';

import { Screens, Strings, Theme, IconList as iconList } from '../../constants';
import { Logo, Icon, HeadersWithTitle, Text, Block, CurrencySymbol, Button, Input, Ripple, Switch, IconList } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import { getDateWithTime, getDate } from '../../utils/accounts';
import imgs from '../../assets/images';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { transactionActions } from "../../actions";
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = iconList.iconList;

class TransactionAdd extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const type = navigation.getParam('type');
    this.state = { 
      type:type,
      id:0,
      category: null,
      transInputs: {
        amount: { type: "integer", value: "" },
        place: { type: "generic", value: "" },
        date: { type: "generic", value: getDate(this.props.languageCode) },
        spend: { type: "bool", value: true },
        reimb: { type: "bool", value: false },
        note: { type: "generic", value: "" },
      },
      validForm: true,
      visibleIconModal: false,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }

  toggleIconModal = () => {
    this.setState({visibleIconModal: !this.state.visibleIconModal});
  }

  selectedCategory = (cat)=>{
    this.setState({category:cat.icon});
    this.toggleIconModal();
  }

  addTransaction(){
    this.getFormValidation({obj:'transInputs'});
    const { transInputs } = this.state;
    if(this.state.validForm){
      const trans = {
        id:this.state.id,
        cat: this.state.category,
        amount: transInputs.amount.value,
        place: transInputs.place.value,
        date: transInputs.date.value,
        spend: transInputs.spend.value,
        reimb: transInputs.reimb.value,
        note: transInputs.note.value,
      }
      console.log("trans", trans);
      this.props.addTrans(trans);
      showToast('Added',"success");
      this.props.navigation.navigate(Screens.Home.route);
      Keyboard.dismiss();
    }
  }

  render(){
    const {language} = this.props;
    const { transInputs, category } = this.state;
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
            <Icon name='tick' size='20' color={Theme.colors.white} />
          </Button>
          <Block flex={false} style={[appStyles.heading125]} shadow>
            <Block row center padding={[0,Theme.sizes.indent1x]}>
              <Button center
                onPress={() => this.toggleIconModal()}
                style={[
                  appStyles.catIcon,
                  appStyles.catIconMid,
                  {backgroundColor: category ? catIcon[category].color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
                  ]}
                >
                <Icon 
                  color={Theme.colors.white} 
                  name={category ? category :'exclamation'} 
                  size={Theme.sizes.title} 
                  />
              </Button>
              <Block>
                <Ripple onPress={() => this.toggleIconModal()} style={{padding:Theme.sizes.indenthalf}}>
                  <Text header white>{category ? language[category] : language['selectCat']}  </Text>
                  <Text caption gray2>{transInputs.date.value}</Text>
                </Ripple>
              </Block>
            </Block>
            <Block column padding={[0,Theme.sizes.indent3x]}>
              <Input
                textColor={Theme.colors.white}
                fontSize={Theme.sizes.h5}
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
                numberOfLines={1}
                onChangeText={value => {this.onInputChange({ field: "amount", value, obj:'transInputs' });}}
              />
            </Block>
          </Block>
          <Content enableOnAndroid style={[appStyles.contentBg,appStyles.contentBg125, styles.container]}>
            <Block column>
              <Input
                placeholder={language['whereSpend']}
                leftIcon={<Icon name='shop' size='20' color={Theme.colors.gray3}/>}
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
                <Icon name='calendar' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{transInputs.date.value}</Text>
              </Block>
            </Ripple>
            <Block row center space="around" style={appStyles.listItem}>
              <Block row center>
                <Icon name='spend' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{language['spend']}</Text>
                </Block>
              <Switch
                value={transInputs.spend.value}
                onValueChange={value => {this.onInputChange({ field: "spend", value, obj:'transInputs' });}}
              />
            </Block>
            <Block row center space="around" style={appStyles.listItem}>
              <Block row center>
                <Icon name='reimburse' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
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
                leftIcon={<Icon name='addnote' size='20' color={Theme.colors.gray3}/>}
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
                <Icon name='uploadbill' size='20' color={Theme.colors.gray3} style={{marginRight:Theme.sizes.indent}}/>
                <Text>{`${language['addBill']} (${language['optional']})`}</Text>
              </Block>
            </Ripple>

          </Content>

          <Modal
              isVisible={this.state.visibleIconModal}
              backdropOpacity={ 0.5 }
              animationIn={ 'slideInUp' }
              animationOut={ 'slideOutDown' }
              onBackdropPress={ () => { this.toggleIconModal(); } }
              onBackButtonPress={ () => { this.toggleIconModal(); } }
              style={{backgroundColor:Theme.colors.white}}
              useNativeDriver
            > 
              <Block row style={[styles.modalContent]}>
                <IconList selectedCategory={this.selectedCategory} />
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
      addTrans: (values) => dispatch(transactionActions.addTransaction(values)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TransactionAdd);