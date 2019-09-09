import React from 'react'
import { StyleSheet, View, ImageBackground, Image} from 'react-native'
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
import { Svgicon, LoginBackIcon, Button, Block, Text, Input } from '../../components';
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
          type: "generic",
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
          type: "generic",
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
          <Content enableOnAndroid>
            <Block column>
              <View style={{flex: 0.8,height: Theme.sizes.window.height-80,}}>
                <View style={appStyles.row}>
                  <LoginBackIcon props={this.props} /> 
                  <Animatable.Text 
                    animation="fadeInDown"
                    style={appStyles.loginTitle}>{language.signup}</Animatable.Text>
                </View> 

                <Animatable.View 
                  animation="fadeInUp"
                  delay={500}
                  style={styles.loginBox}>
                  <Block padding={[Theme.sizes.indent]} margin={[Theme.sizes.indent,0]}>
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Svgicon name='username' width='20' color={Theme.colors.white}/>}
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
                      leftIcon={<Svgicon name='email' width='20' color={Theme.colors.white}/>}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'email', 'email')}
                      returnKeyType={"next"}
                      value={authInputs.email.value}
                      onChangeText={value => {this.onInputChange({ field: "email", value, obj:'authInputs' });}}
                    />
                    <Input
                      textColor={Theme.colors.white}
                      leftIcon={<Svgicon name='password' width='20' color={Theme.colors.white}/>}
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
                      leftIcon={<Svgicon name='password' width='20' color={Theme.colors.white}/>}
                      secureTextEntry={true}
                      borderColor={Theme.colors.white}
                      activeBorderColor={Theme.colors.white}
                      error={this.renderError('authInputs', 'confirmpass', 'password')}
                      returnKeyType={"go"}
                      value={authInputs.confirmpass.value}
                      onChangeText={value => {this.onInputChange({ field: "confirmpass", value, obj:'authInputs' });}}
                    />
                  </Block>
                </Animatable.View>
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