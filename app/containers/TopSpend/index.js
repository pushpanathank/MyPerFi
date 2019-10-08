import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import { connect } from "react-redux";
// https://stackoverflow.com/questions/56092937/local-schedule-notification-react-native
import { Theme, Screens, ActionTypes, Account, IconList } from '../../constants';
import { Headers, Block, Icon, IconBack, IconBell, Text, Button, Ripple, CurrencySymbol, Divider } from '../../components';
import { getLanguage } from '../../utils/common';
import { formatDate, getTopSpendAreas, getCurrentMonthTotalSpend } from '../../utils/accounts';
import imgs from '../../assets/images';
import {  Container,  Content } from 'native-base';
import { billActions } from "../../actions/";
import appStyles from '../../theme/appStyles';
import styles from './styles';

const catIcon = IconList.iconList;

class TopSpend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderTopSpendItem = ({item}) =>{
    const {language, languageCode} = this.props;
    let color = item.cat ? catIcon[item.cat].color : Theme.colors.accent,
    percentage = ((item.amount/this.props.currMonthSpend)*100).toFixed(2);
    return(<Ripple>
      <Block row center space="around" style={[appStyles.listItemTrans,styles.listItem]}>
        <Block row flex={1} left>
          <View style={[
            appStyles.catIcon,
            appStyles.catIconMid,
            {backgroundColor: color, marginHorizontal: Theme.sizes.indenthalf}
            ]}
            >
            <Icon name={item.cat? item.cat: 'exclamation'} size={Theme.sizes.title}/>
          </View>
        </Block>
        <Block column left flex={4} style={{paddingLeft:Theme.sizes.indenthalf}}>
          <Text>{language[item.cat]}</Text>
          <View style={{width:`${percentage}%`, backgroundColor:color, height:Theme.sizes.indentsmall, marginTop:Theme.sizes.indentsmall}}></View>
        </Block>
        <Block column flex={1.2} right>
          <Text><CurrencySymbol size='header'/> {item.amount} </Text>
          <Text gray small>{`${percentage}%`}</Text>
        </Block>
      </Block>
    </Ripple>);
  }

  noItemDisplay = (key) => {
    const {language} = this.props;
    return (
      <Block column center middle style={{padding:Theme.sizes.indent}}><Text gray>{language[key]}</Text></Block>
    );
  };

  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconBack />} 
            rightIcon={<IconBell {...this.props} />}
            />
          <View style={[appStyles.heading40,{paddingTop:0}]}>
            <Text h3 white light>{language.topSpend}</Text>
          </View>
            <View style={[appStyles.contentBg]}>
              <FlatList
                data={this.props.topSpendAreas}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderTopSpendItem}
                ListEmptyComponent={this.noItemDisplay('noTransactions')}
              />
            </View>   
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId),
  transactions = state.transactions.items,
  topSpendAreas= getTopSpendAreas({transactions:transactions,len:0}),
  currMonthSpend= getCurrentMonthTotalSpend(transactions);
  return {
    language: language,
    topSpendAreas: topSpendAreas,
    currMonthSpend:currMonthSpend
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TopSpend);