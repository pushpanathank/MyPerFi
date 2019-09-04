import React from 'react'
import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, ScrollView, Picker} from 'react-native'
import _ from 'lodash'; 
import { Theme, Screens, Strings, Account } from '../../constants';
import { HeadersWithTitle, IconList, Button, Block, Input, Text } from '../../components';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import {
  Container, Content, Icon, Spinner,
  Header, Left, Body, Title, Right, List, ListItem, Item
} from 'native-base';
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
  
  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <HeadersWithTitle {...this.props} title={''} leftIcon rightIcon/>
          <View style={[appStyles.heading50]}>
            <Text style={appStyles.headingText}>{language.settings}</Text>
          </View>
            <ScrollView showsVerticalScrollIndicator={false} style={[appStyles.contentBg,styles.container]}>
              <Block style={styles.inputs}>
                <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                  <Block>
                    <Text style={{ marginBottom: 10 }}>{language.chooseLang}</Text>
                  </Block>
                  <Block right>
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
                </Block>
                <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                  <Block>
                    <Text style={{ marginBottom: 10 }}>{language.chooseCurr}</Text>
                  </Block>
                  <Block right>
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
                </Block>
              </Block>
            </ScrollView>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    currency: state.settings.currency,
    language: getLanguage(state.settings.languageId),
    languageId: state.settings.languageId || 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: (value) => dispatch(settingActions.setLanguage({id:value,set:1})),
      setCurrency: (value) => dispatch(settingActions.setCurrency(value)),
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Settings);