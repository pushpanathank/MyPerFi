import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox, Block, Text, CurrencySymbol, Switch } from '../../components';
import { getLanguage } from '../../utils/common';
import { Theme } from '../../constants';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class WalletForm extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      notifications: true
    }
  }
  renderToggleInput = (field) => (
    <Switch
      value={field.input.value}
      onValueChange={field.input.onChange}
    />
  );
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <Block block>
          <Text gray>{language.walName}</Text>
        </Block>
        <Block block margin={[0,0,Theme.sizes.indent,-Theme.sizes.indent]}>
          <Field 
            name="name" 
            component={InputBox} 
            placeholder={''}
            style={{marginTop:0}}
            validate={[required({msg: `${language.walName} ${language.required}`})]}
          />
        </Block>
        <Block block>
          <Text gray>{language.walBal}</Text>
        </Block>
        <Block block margin={[0,0,Theme.sizes.indent,-Theme.sizes.indent]}>
          <Field 
            name="bal" 
            component={InputBox} 
            placeholder={''}
            keyboardType={'decimal-pad'}
            style={{marginTop:0}}
            icon={<CurrencySymbol size='h3'/>}
            iconStyle={{top:Theme.sizes.indent,paddingLeft:15}}
            validate={[required({msg: `${language.walBal} ${language.required}`})]}
          />
        </Block>
        <Block row center space="between">
          <Text gray>{language.walAct}?</Text>
          <Field 
            name="act" 
            component={this.renderToggleInput} 
            placeholder={''}
            keyboardType={'decimal-pad'}
            style={{marginTop:0}}
            icon={<CurrencySymbol size='h3'/>}
            iconStyle={{top:Theme.sizes.indent,paddingLeft:15}}
            validate={[required({msg: `${language.walAct} ${language.required}`})]}
          />
        </Block>
      </Form>
    )
  }
}


const walletform = reduxForm({
  form: 'walletForm',
  touchOnBlur: false
})(WalletForm);

const mapStateToProps = (state) => {
  return {
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(walletform);