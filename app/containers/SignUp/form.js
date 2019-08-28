import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email, length, confirmation } from 'redux-form-validators'
import { InputBox, Svgicon } from '../../components';
import { Colors } from '../../constants';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field 
          name="name" 
          component={InputBox} 
          placeholder={language.name}
          keyboardType={'default'}
          icon=<Svgicon name='username' width='20' color={Colors.white} style={appStyles.inputIcon} />
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: `${language.name} ${language.required}`})]}
        />
        <Field 
          name="email" 
          component={InputBox} 
          placeholder={language.email}
          keyboardType={'email-address'}
          icon={<Svgicon name='email' width='20' color={Colors.white} style={appStyles.inputIcon} />}
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: `${language.email} ${language.required}`}), email({msg: `${language.email} ${language.notValid}`})]}
        />
        <Field 
          name="password" 
          component={InputBox} 
          placeholder={language.password}
          secureTextEntry={true}
          icon={<Svgicon name='password' width='20' color={Colors.white} style={appStyles.inputIcon} />}
          iconStyle={{top:5,paddingLeft:15}}
          validate={[required({msg: `${language.password} ${language.required}`}),length({ minimum: 4,msg: `${language.tooShort}` })]}
        />
        <Field 
          name="confirmpass" 
          component={InputBox} 
          placeholder={language.confirmPassword}
          secureTextEntry={true}
          icon={<Svgicon name='password' width='20' color={Colors.white} style={appStyles.inputIcon} />}
          iconStyle={{top:5,paddingLeft:15}}
          validate={[confirmation({ field: 'password', msg: `${language.password} ${language.doesntMatch}` })]}
        />
      </Form>
    )
  }
}


const signupform = reduxForm({
  form: 'signupForm',
})(SignUpForm);

const mapStateToProps = (state) => {
  return {
    language: state.settings.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signupform);