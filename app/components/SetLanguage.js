import React from "react";
import {
  Icon,
  Text,
  Button, ListItem, Radio, List
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { connect } from "react-redux";
import Modal from 'react-native-modal';

import { ActionTypes, Strings, Colors } from '../constants';
import { settingActions } from "../actions";
import appStyles from '../theme/appStyles';

class SetLanguage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <List style={{width:'100%'}}>
        {Strings.map((value, index) => {
          if(this.props.btnView){
            return (<Button 
              block
              key={index}
              style={[appStyles.introLangBtn,this.props.languageId === value.id ? appStyles.introLangBtnActive : {}]}
              onPress={() => {this.props.setLanguage(index,value)}}
              >
              <Text style={{color:Colors.black}}>{value.lang}</Text>
            </Button>);
          }else{
            return (
              <ListItem 
                button 
                full 
                key={index} 
                onPress={() => {this.props.setLanguage(index,value)}} 
                style={{borderBottomWidth: 0, width:'100%'}}>
                <Radio 
                  id={value.langCode}
                  selected={this.props.languageId === value.id} 
                />
                <Text style={{paddingLeft: 10}}>{value.lang}</Text>
              </ListItem>
            );
          }
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageId: state.settings.languageId || 0,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setLanguage: (index,value) => dispatch(settingActions.setLanguage({id:index,code:value.langCode,set:1})),
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SetLanguage);