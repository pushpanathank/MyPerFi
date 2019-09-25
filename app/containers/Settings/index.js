import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, Picker} from 'react-native'
import _ from 'lodash'; 
import { Theme, Screens, Strings, Account } from '../../constants';
import { Headers, IconList, Button, Block, Input, Text, IconMenu, IconBell } from '../../components';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import { Container, Content } from 'native-base';
import { connect } from "react-redux";
import { userActions, settingActions } from "../../actions";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  setBudget = (value)=>{
    this.props.setBudget(value.toString());
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: (value) => dispatch(settingActions.setLanguage({id:value, code: Strings[value].langCode ,set:1})),
      setCurrency: (value) => dispatch(settingActions.setCurrency(value)),
      setBudget: (value) => dispatch(settingActions.setBudget(value)),
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Settings);