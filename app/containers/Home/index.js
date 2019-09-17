import React from 'react'
import { StyleSheet, View, ImageBackground, Image, FlatList} from 'react-native'
import {
  Container,
  Content,
} from 'native-base';
import Modal from 'react-native-modal';

import { Theme, Screens, IconList } from '../../constants';
import { Icon, HeadersWithTitle, Block, Text, Divider, Button, Ripple, CurrencySymbol } from '../../components';
import { formatDate } from '../../utils/accounts';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = IconList.iconList;

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

  manageTransaction = (type,id) =>{
    if(id==0) this.toggleIconModal();
    this.props.navigation.navigate(Screens.TransactionManage.route,{type:type,id:id})
  }

  render(){
    const {language, languageId, languageCode} = this.props;
    const modalWidth = languageId ? {width: Theme.sizes.indent3x*4}:{};
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={formatDate({lang:languageCode,format:'month'})} leftIcon rightIcon/>

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
              <View style={[appStyles.fabAddTransContent,modalWidth]}>
                <Block middle>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.manageTransaction(1,0); }}>
                    <Text>{language.addIn}</Text>
                  </Button>
                </Block>
                <Block middle>
                  <Button ripple style={appStyles.fabAddTransBtn} onPress={() => { this.manageTransaction(0,0); }}>
                    <Text>{language.addSp}</Text>
                  </Button>
                </Block>
                  { /* <Divider style={{flex:0,marginVertical: Theme.sizes.indentsmall}}/>
                  <Button style={appStyles.fabAddTransBtn} onPress={() => { this.manageTransaction('addCashIn'); }}>
                    <Text>{language.addCashIn}</Text>
                  </Button>
                  <Button style={appStyles.fabAddTransBtn} onPress={() => { this.manageTransaction('addCashSp'); }}>
                    <Text>{language.addCashSp}</Text>
                  </Button> */ }
              </View>
            </View>
          </Modal>

          <Button ripple rippleContainerBorderRadius={Theme.sizes.indent}
            onPress={() => { this.toggleIconModal(); }}
            style={appStyles.fabBottomRight}
            >
            <Icon name="plus" size={16} />
          </Button>

          <Content enableOnAndroid style={appStyles.row}>
            <Block block style={styles.dashboard}>

            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.latestTrans}</Text>
              <Divider />
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Ripple onPress={()=> this.manageTransaction(2,item.id) }>
                    <Block row center space="around" style={appStyles.listItemTrans}>
                      <Block row flex={1} left>
                        <View style={[
                          appStyles.catIcon,
                          appStyles.catIconMid,
                          {backgroundColor: item.cat ? catIcon[item.cat].color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
                          ]}
                          >
                          <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
                        </View>
                      </Block>
                      <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
                        <Text>{item.place ? item.place : language['unknown']}</Text>
                        <Text caption gray>{item.cat ? language[item.cat] : language['unknown']}</Text>
                      </Block>
                      <Block column flex={1} right>
                        <Text><CurrencySymbol size='header' color={Theme.colors.black}/> {item.amount} </Text>
                        <Text gray caption>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
                      </Block>
                    </Block>
                  </Ripple>
                )}
              />
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.topSpend}</Text>
              <Divider />
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Ripple>
                    <Block row center space="around" style={appStyles.listItemTrans}>
                      <Block row flex={1} left>
                        <View style={[
                          appStyles.catIcon,
                          appStyles.catIconMid,
                          {backgroundColor: item.cat ? catIcon[item.cat].color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
                          ]}
                          >
                          <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
                        </View>
                      </Block>
                      <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
                        <Text>{item.place ? item.place : language['unknown']}</Text>
                        <Text caption gray>{item.cat ? language[item.cat] : language['unknown']}</Text>
                      </Block>
                      <Block column flex={1} right>
                        <Text><CurrencySymbol size='header' color={Theme.colors.black}/> {item.amount} </Text>
                        <Text gray caption>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
                      </Block>
                    </Block>
                  </Ripple>
                )}
              />
            </Block>
            <Block block shadow color="white" margin={Theme.sizes.indentsmall} padding={Theme.sizes.indent}>
              <Text h5 light>{language.bills}</Text>
              <Divider />
              <FlatList
                data={this.props.transactions}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Ripple>
                    <Block row center space="around" style={appStyles.listItemTrans}>
                      <Block row flex={1} left>
                        <View style={[
                          appStyles.catIcon,
                          appStyles.catIconMid,
                          {backgroundColor: item.cat ? catIcon[item.cat].color : Theme.colors.accent, marginHorizontal: Theme.sizes.indenthalf}
                          ]}
                          >
                          <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
                        </View>
                      </Block>
                      <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
                        <Text>{item.place ? item.place : language['unknown']}</Text>
                        <Text caption gray>{item.cat ? language[item.cat] : language['unknown']}</Text>
                      </Block>
                      <Block column flex={1} right>
                        <Text><CurrencySymbol size='header' color={Theme.colors.black}/> {item.amount} </Text>
                        <Text gray caption>{formatDate({lang:languageCode, date:item.date, format:'dateMonthShort'})}</Text>
                      </Block>
                    </Block>
                  </Ripple>
                )}
              />
            </Block>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
    console.log("transactions", state.transactions);
    return {
    user: state.auth.user,
    languageId: state.settings.languageId,
    languageCode: state.settings.languageCode,
    language: getLanguage(state.settings.languageId),
    transactions: Object.values(state.transactions),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);
