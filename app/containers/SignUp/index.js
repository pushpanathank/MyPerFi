import React from 'react'
import { StyleSheet, View, ImageBackground, Image, Keyboard} from 'react-native'
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Spinner
} from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import { Theme, Screens } from '../../constants';
import { Icon, IconBack, Headers, Button, Block, Text, Input } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import {showToast, getLanguage} from '../../utils/common';
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      authInputs: {
        name: {
          type: "genericRequired",
          value: ""
        },
        email: {
          type: "email",
          value: ""
        },
        password: {
          type: "password",
          value: ""
        },
        confirmpass: {
          type: "genericRequired",
          value: ""
        }
      },
      validForm: true,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.signup = this.signup.bind(this);
  }

  signup(){
    this.getFormValidation({obj:'authInputs'});
    if(this.state.validForm){
      Keyboard.dismiss();
      const { authInputs } = this.state;
      const user = {
        name: authInputs.name.value, 
        email: authInputs.email.value, 
        password: authInputs.password.value, 
        confirmpass: authInputs.confirmpass.value
      };
      this.props.signupAction(user).then(res => {
        if(res.status == 200){
          showToast(res.msg,"success");
          // dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
          this.props.navigation.navigate(Screens.SignIn.route)
        }else{
          showToast(res.msg,"danger");
        }
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         showToast(message,"danger");
       }
       console.log(`
          Error messages returned from server:`, messages )
      });
    }
  }

  render(){
    const { language } = this.props;
    const { authInputs } = this.state;
    return (
      <Block style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconBack />} 
            />
          <Content enableOnAndroid>
            <Block column>
              <View style={{flex: 0.8,height: Theme.sizes.window.height-160,}}>
                <Block flex={false} center>
                  <Animatable.Text 
                    animation="fadeInDown"
                    style={appStyles.loginTitle}>{language.signup}</Animatable.Text>
                </Block> 

                <Block padding={[Theme.sizes.indent]} margin={[Theme.sizes.indent2x,0,0,0]}>
                <Animatable.View 
                  animation="fadeInUp"
                  delay={500}
                  style={styles.loginBox}>
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Icon name='username' size='20'/>}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'name', 'name')}
                      returnKeyType={"next"}
                      keyboardType={'default'}
                      value={authInputs.name.value}
                      onChangeText={value => {this.onInputChange({ field: "name", value, obj:'authInputs' });}}
                    />
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Icon name='email' size='20'/>}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'email', 'email')}
                      returnKeyType={"next"}
                      value={authInputs.email.value}
                      onChangeText={value => {this.onInputChange({ field: "email", value, obj:'authInputs' });}}
                    />
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Icon name='password' size='20'/>}
                      secureTextEntry={true}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'password', 'password')}
                      returnKeyType={"next"}
                      value={authInputs.password.value}
                      onChangeText={value => {this.onInputChange({ field: "password", value, obj:'authInputs' });}}
                    />
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Icon name='password' size='20'/>}
                      secureTextEntry={true}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'confirmpass', 'password')}
                      returnKeyType={"go"}
                      value={authInputs.confirmpass.value}
                      onChangeText={value => {this.onInputChange({ field: "confirmpass", value, obj:'authInputs' });}}
                    />
                  </Animatable.View>
                </Block>
              </View>  
              <Animatable.View 
                animation="fadeIn"
                delay={1000}
                style={{flex: 0.2,height: 80,}}> 
                { this.props.isLoading ? 
                   <Spinner color={Theme.colors.secondary} /> : 
                    <Button ripple
                      color="secondary"
                      onPress={() => this.signup()}
                    >
                      <Text center white transform="uppercase">{language.signup}</Text>
                    </Button>
                }
              </Animatable.View>  
            </Block>          
          </Content>
         </ImageBackground>
      </Block>
     
    );
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    isLoading: state.common.isLoading,
    language: getLanguage(state.settings.languageId),
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      signupAction: (values) => dispatch(userActions.signup(values)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);