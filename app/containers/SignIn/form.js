import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox, Svgicon } from '../../components';
import { getLanguage } from '../../utils/common';
import { Theme } from '../../constants';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class SignInForm extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field 
          name="email" 
          component={InputBox} 
          placeholder={language.email}
          textColor={Theme.colors.white}
          keyboardType={'email-address'}
          icon={<Svgicon name='username' width='20' color={Theme.colors.white} style={appStyles.inputIcon} />}
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: `${language.email} ${language.required}`}), email({msg: `${language.email} ${language.notValid}`})]}
        />
        <Field 
          name="password" 
          component={InputBox} 
          placeholder={language.password}
          textColor={Theme.colors.white}
          secureTextEntry={true}
          icon={<Svgicon name='password' width='20' color={Theme.colors.white} style={appStyles.inputIcon} />}
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: `${language.password} ${language.required}`})]}
        />
      </Form>
    )
  }
}


const signinform = reduxForm({
  form: 'signinForm',
  touchOnBlur: false
})(SignInForm);

const mapStateToProps = (state) => {
  return {
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinform);