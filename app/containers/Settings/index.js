import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, Picker} from 'react-native'
import _ from 'lodash'; 
import { Theme, Screens, Strings, Account } from '../../constants';
import { Headers, IconList, Button, Block, Input, Text, IconMenu, IconBell } from '../../components';
import { getLanguage, showToast } from '../../utils/common';
import imgs from '../../assets/images';
import { Container, Content, Spinner } from 'native-base';
import { connect } from "react-redux";
import { settingActions, transactionActions } from "../../actions";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBackup: false,
      isRestore: false,
    };
  }

  setBudget = (value)=>{
    this.props.setBudget(value.toString());
  }

  backup = ()=>{
    this.setState({isBackup: true});
    let data = { user_id : this.props.user.user_id, transactions: this.props.transactions};
    this.props.backup(data).then(res => {
      this.setState({isBackup: false});
      showToast(res.msg,"success");
      })
      .catch(error => {
        this.setState({isBackup: false});
        console.log("error", error);
      });
  }
  restore = ()=>{
    this.setState({isRestore: true});
    let data = { user_id : this.props.user.user_id };
    this.props.restore(data).then(res => {
      this.setState({isRestore: false});
      showToast(res.msg,"success");
      })
      .catch(error => {
        this.setState({isRestore: false});
        console.log("error", error);
      });
  }
  
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
            leftIcon={<IconMenu {...this.props} />} 
            rightIcon={<IconBell {...this.props} />}
            />
          <View style={[appStyles.heading50]}>
            <Text style={appStyles.headingText}>{language.settings}</Text>
          </View>
          <Content enableOnAndroid style={[appStyles.contentBg,styles.container]}>
              <Block style={styles.inputs}>
                <Block row space="between" style={styles.inputRow}>
                  <Button ripple color="secondary" center style={{width:'48%'}} onPress={this.backup}>
                    { this.state.isBackup ? 
                     <Spinner color={Theme.colors.primary} /> : 
                     <Text white>{language.backup}</Text>
                   }
                  </Button>
                  <Button ripple color="secondary" center style={{width:'48%'}} onPress={this.restore}>
                    { this.state.isRestore ? 
                     <Spinner color={Theme.colors.primary} /> : 
                     <Text white>{language.restore}</Text>
                    }
                  </Button>
                </Block>
                <Block row style={styles.inputRow}>
                  <Text style={{ marginBottom: 10 }}>{language.chooseLang}</Text>
                </Block>
                <Block row style={styles.inputRow}>
                  <Picker
                    selectedValue={this.props.languageId}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) =>{
                      this.props.setLanguage(itemValue)
                    }
                    }>
                    {
                      Strings.map((value, index) => {
                        return (
                          <Picker.Item key={index} label={value.lang} value={index} />
                          );
                      })
                    }
                  </Picker>
                </Block>
                <Block row style={styles.inputRow}>
                  <Text style={{ marginBottom: 10 }}>{language.chooseCurr}</Text>
                </Block>
                <Block row style={styles.inputRow}>
                  <Picker
                    selectedValue={this.props.currency}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) =>{
                      this.props.setCurrency(itemValue)
                    }
                    }>
                    {
                      Object.keys(Account.currencies).map((key) => {
                        return (
                          <Picker.Item key={key} label={`${Account.currencies[key]} - ${language[key]}`} value={key} />
                          );
                      })
                    }
                  </Picker>
                </Block>
                <Block row style={styles.inputRow}>
                  <Text>{language.setBudget}</Text>
                </Block>
                <Block column style={styles.inputRow}>
                  <Input
                    placeholder={'0'}
                    borderColor={Theme.colors.gray2}
                    returnKeyType={"done"}
                    value={this.props.budget}
                    onChangeText={value => {this.setBudget(value);}}
                    style={{marginBottom:Theme.sizes.indent}}
                  />
                </Block>
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
    currency: state.settings.currency,
    budget: state.settings.budget,
    language: getLanguage(state.settings.languageId),
    languageId: state.settings.languageId || 0,
    transactions:state.transactions.items
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
      setLanguage: (value) => dispatch(settingActions.setLanguage({id:value, code: Strings[value].langCode ,set:1})),
      setCurrency: (value) => dispatch(settingActions.setCurrency(value)),
      setBudget: (value) => dispatch(settingActions.setBudget(value)),
      backup: (obj) => dispatch(transactionActions.backup(obj)),
      restore: (obj) => dispatch(transactionActions.restore(obj)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Settings);