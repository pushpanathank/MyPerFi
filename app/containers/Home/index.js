import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
import {
  Container,
  Content,
} from 'native-base';
import Modal from 'react-native-modal';

import { Theme, Screens } from '../../constants';
import { Svgicon, HeadersWithTitle, Block, Text, Divider, Button, Ripple } from '../../components';
import { fullMonth } from '../../utils/accounts';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTransModal: false
    }
  }
  toggleIconModal = () => {
    this.setState({addTransModal: !this.state.addTransModal});
  }

  addTransaction = (type) =>{
    this.toggleIconModal();
    this.props.navigation.navigate(Screens.TransactionAdd.route,{activeTab:0, accId:type})
  }

  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={fullMonth}/>

          <Modal
            isVisible={this.state.addTransModal}
            backdropOpacity={ 0.2 }
            animationIn={ 'fadeInUp' }
            animationOut={ 'fadeOutDown' }
            onBackdropPress={ () => { this.toggleIconModal(); } }
            onBackButtonPress={ () => { this.toggleIconModal(); } }
            style={appStyles.bottomFabRightModal}
            useNativeDriver
          > 
            <View style={[appStyles.fabContentModal]}>
              <View style={appStyles.fabAddTransContent}>
                <Block block column>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.addTransaction(0); }}>
                    <Text>Add Account Income</Text>
                  </Button>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.addTransaction(1); }}>
                    <Text>Add Account Spend</Text>
                  </Button>
                  <Divider style={{flex:0,marginVertical: Theme.sizes.indentsmall}}/>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.addTransaction(2); }}>
                    <Text>Add Cash Income</Text>
                  </Button>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.addTransaction(3); }}>
                    <Text>Add Cash Spend</Text>
                  </Button>
                </Block>
              </View>
            </View>
          </Modal>

          <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
            onPress={() => { this.toggleIconModal(); }}
            style={appStyles.fabBottomRight}
            >
           <Svgicon 
              color={Theme.colors.white}
              name={'plus'} 
              width={18} 
              height={18} />
          </Button>

          <Content enableOnAndroid style={appStyles.row}>
            <Block block style={styles.dashboard}>

            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.latestTrans}</Text>
              <Divider />
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.topSpend}</Text>
              <Divider />
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.bills}</Text>
              <Divider />
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
              <Svgicon name="chart"  width={200}/>
            </Block>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);