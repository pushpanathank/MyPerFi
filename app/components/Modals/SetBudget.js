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


const setBudget = class SetBudget extends Component {
  constructor(props) {
    super(props);
  }
  setBudget = (value)=>{
    this.props.setBudget(value.toString());
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
          <View style={{height:Theme.sizes.indent6x, width:'100%'}}>
            <Block column>
              <Text light>My monthly budget</Text>
              <Divider style={{marginBottom:0, flex:0}} color={Theme.colors.gray3}/>
              <Input
                textColor={Theme.colors.white}
                fontSize={Theme.sizes.h5}
                placeholder={language['enterAmt']}
                leftIcon={<CurrencySymbol size='h3'/>}
                leftIconStyle={{bottom:6}}
                borderColor={Theme.colors.gray}
                activeBorderColor={Theme.colors.gray3}
                selectionColor={Theme.colors.white}
                returnKeyType={"next"}
                keyboardType={"numeric"}
                value={this.props.budget}
                numberOfLines={1}
                onChangeText={value => {this.setBudget(value)}}
              />
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

export default connect(mapStateToProps, null)(setBudget);