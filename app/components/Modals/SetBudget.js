import React, { Component, memo } from "react";
import { FlatList, View } from 'react-native';
import { connect } from "react-redux";
import Modal from 'react-native-modal';

import { getLanguage } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import imgs from '../../assets/images';
import { settingActions } from "../../actions";
import { Theme } from '../../constants';
import Input from '../Input';
import Block from '../Block';
import Text from '../Text';
import Divider from '../Divider';
import CurrencySymbol from '../CurrencySymbol';
import Button from '../Button';


const setBudget = class SetBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.budget
    }
  }

  setValue = (val)=>{
    this.setState({ budget: val });
  }
  setBudget = ()=>{
    let val = this.state.budget == '' ? 0: this.state.budget.toString();
    this.props.setBudget(val);
    this.props.onSelect();
  }
  render() {
    const {language} = this.props;
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropOpacity={ 0.2 }
        animationIn={ 'fadeInUp' }
        animationOut={ 'fadeOutDown' }
        onBackdropPress={ () => { this.props.toggleModal(); } }
        onBackButtonPress={ () => { this.props.toggleModal(); } }
        style={{}}
        useNativeDriver
      > 
        <View style={[appStyles.modalContent,{width:'80%', left:'10%'}]}>
          <View style={{height:Theme.sizes.indent6x*1.3, width:'100%'}}>
            <Block column>
              <Text light>{language.myMonthlyBudget}</Text>
              <Input
                textColor={Theme.colors.black}
                fontSize={Theme.sizes.h5}
                placeholder={language['enterAmt']}
                leftIcon={<CurrencySymbol size='h3'/>}
                leftIconStyle={{bottom:6}}
                borderColor={Theme.colors.gray}
                activeBorderColor={Theme.colors.gray3}
                selectionColor={Theme.colors.black}
                returnKeyType={"next"}
                keyboardType={"numeric"}
                value={this.state.budget}
                numberOfLines={1}
                onChangeText={value => {this.setValue(value)}}
              />
              <Block row center middle>
                <Button ripple color="secondary" center style={{width:'50%', marginTop:Theme.sizes.indent}} onPress={this.setBudget}>
                   <Text white>{language.setBudget}</Text>
                </Button>
              </Block>
          </Block>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId);
  return {
    language: language,
    budget: state.settings.budget.toString(),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setBudget: (value) => dispatch(settingActions.setBudget(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(setBudget);