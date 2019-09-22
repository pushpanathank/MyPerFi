import React, { Component, memo } from "react";
import { FlatList, View } from 'react-native';
import { connect } from "react-redux";
import Modal from 'react-native-modal';

import { getLanguage } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import imgs from '../../assets/images';
import { Theme } from '../../constants';
import Ripple from '../Ripple';
import Block from '../Block';
import Text from '../Text';


const SelectAccount = class CurrencySymbol extends Component {
  constructor(props) {
    super(props);
  }
  onSelect = (type,transid,accid) =>{
    this.props.isVisible = false;
    this.props.onSelect(type,transid,accid)
  }
  renderAccountItem = ({item}) =>{
    const {language, languageCode} = this.props;
    return(<Ripple onPress={()=> this.onSelect(this.props.transType,0,item.id) }>
      <Block row center space="around" style={appStyles.listItem}>
        <Text header>{item.name}</Text>
      </Block>
    </Ripple>);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropOpacity={ 0.2 }
        animationIn={ 'fadeInUp' }
        animationOut={ 'fadeOutDown' }
        onBackdropPress={ () => { this.props.toggleModal(this.props.transType); } }
        onBackButtonPress={ () => { this.props.toggleModal(this.props.transType); } }
        style={{}}
        useNativeDriver
      > 
        <View style={[appStyles.modalContent,{width:'80%', left:'10%'}]}>
          <View style={{height:Theme.sizes.indent6x*2, width:'100%'}}>
            <FlatList
              data={this.props.accounts}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderAccountItem}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId);
  return {
    accounts: [...Object.values(state.accounts.bankAcc),...Object.values(state.accounts.walletAcc),{id:0,name:language.others}],
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, null)(SelectAccount);