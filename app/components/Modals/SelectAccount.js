import React, { Component, memo } from "react";
import { FlatList, View } from 'react-native';
import { connect } from "react-redux";
import Modal from 'react-native-modal';

import { getLanguage } from '../../utils/common';
import { groupAccType } from '../../utils/accounts';
import appStyles from '../../theme/appStyles';
import imgs from '../../assets/images';
import { Theme } from '../../constants';
import Ripple from '../Ripple';
import Block from '../Block';
import Text from '../Text';
import Divider from '../Divider';


const selectAccount = class SelectAccount extends Component {
  constructor(props) {
    super(props);
  }
  onSelect = (type,transid,accid) =>{
    this.props.isVisible = false;
    this.props.onSelect(type,transid,accid)
  }
  goToAccounts = () =>{
    this.props.isVisible = false;
    this.props.goToAccounts();
  }
  noItemDisplay = () =>{
    const {language} = this.props;
    return (
      <Ripple onPress={()=> this.goToAccounts() }>
        <Block column center middle style={{padding:Theme.sizes.indent}}>
          <Text gray>{language.noAccounts}</Text>
          <Text>{language.touchHere} {language.addAcc}</Text>
        </Block>
      </Ripple>
    );
  }
  renderAccountItem = ({item}) =>{
    const {language, languageCode} = this.props;
    return(<Ripple onPress={()=> this.onSelect(this.props.transType,0,item.id) }>
      <Block row style={[appStyles.listItem,{borderBottomColor: Theme.colors.gray2,paddingVertical: Theme.sizes.indenthalf}]}>
        <Text body>{item.name}</Text>
      </Block>
    </Ripple>);
  }

  render() {
    const {language} = this.props;
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
            <Block column>
              <Text title center>{this.props.title ? this.props.title : language.selectAcc}</Text>
              <Divider style={{marginBottom:0, flex:0}} color={Theme.colors.gray3}/>
              <FlatList
                data={this.props.accounts}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderAccountItem}
                ListEmptyComponent={this.noItemDisplay}
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
    accounts: groupAccType({accounts:state.accounts.items,type:-1}),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, null)(selectAccount);