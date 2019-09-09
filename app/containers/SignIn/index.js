import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native'
import _ from 'lodash'; 
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Item,
  Spinner,
} from 'native-base';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import { Theme, Screens, ActionTypes } from '../../constants';
import { Logo, Svgicon, ModalBox, SetLanguage, SelectLanguage, Loader, AppIntro, Button, Block, Text, Input } from '../../components';
import imgs from '../../assets/images';
import { userActions, settingActions } from "../../actions";
import { showToast, getLanguage } from '../../utils/common';
import { validationService } from '../../utils/validation';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      authInputs: {
        email: {
          type: "email",
          value: ""
        },
        password: {
          type: "password",
          value: ""
        }
      },
      validForm: true,
      visibleModal: false,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {
    if(this.props.user!=null){
      this.props.navigation.navigate(Screens.SignInStack.route);
    }
    setTimeout(()=>{
      if(this.props.languageSet==0 && !this.props.showIntro){
        this.props.showModal();
      }
    },2000);
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignUp.route);
    this.resetUserInputs();
  }

  onForgotpasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route);
    this.resetUserInputs();
  }

  signin(){
    this.getFormValidation({obj:'authInputs'});
    if(this.state.validForm){
      const { authInputs } = this.state;
      const user = {email: authInputs.email.value, password: authInputs.password.value};
      this.props.signinAction(user).then(res => {
        if(res.status == 200){
          // dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
          this.props.navigation.navigate(Screens.SignInStack.route)
          this.resetUserInputs();
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

  resetUserInputs(){
    this.setState({authInputs:{email: {type: "email",value: ""},password: {type: "password",value: ""}}});
  }


  render(){
    const { language } = this.props;
    const { authInputs } = this.state;
    if(this.props.showIntro){
      // Show the app intro on first time launch
      if(this.props.languageSet==0){
        return (<SelectLanguage />);
      }else{
        return (<AppIntro />);
      }
    }
    if(this.props.user==null){
      // Login 
      return (
        <Block style={appStyles.container}>
          <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
            <Content enableOnAndroid>
              <Block column>
                <View style={{flex: 0.8,height: Theme.sizes.window.height-80}}>
                  <View style={appStyles.rowXcenter}>
                    <TouchableWithoutFeedback onPress={() => this.props.resetState()}>
                      <Logo style={appStyles.loginLogo} />
                    </TouchableWithoutFeedback >
                    <Text style={appStyles.loginMidText}>{language.signinTitle}</Text>
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
                        returnKeyType={"go"}
                        value={authInputs.password.value}
                        onChangeText={value => {this.onInputChange({ field: "password", value, obj:'authInputs' });}}
                      />
                    </Block>
                    <Block row padding={[0,Theme.sizes.indent]}>
                      <Block>
                        <Button color="transparant"  
                          onPress={() => this.onSignupButtonPressHandler()}
                          style={[styles.linkTextBtn]}
                        >
                          <Text white > {language.createAcc} </Text>
                        </Button> 
                      </Block>
                      <Block>
                        <Button color="transparant"  
                          onPress={() => this.onForgotpasswordPressHandler()}
                          style={[styles.linkTextBtn]}
                        >
                          <Text white right > {language.forgot} </Text>
                        </Button>
                      </Block>
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
                        onPress={() => this.signin()}
                      >
                        <Text center white transform="uppercase"> {language.signin} </Text>
                      </Button>
                  }
                </Animatable.View>  
              </Block>
              <ModalBox 
                visibleModal={this.state.visibleModal}
                content={<SetLanguage />} 
                style={appStyles.bottomModal}
                contentStyle={appStyles.setLanguage}
                />         
            </Content>
           </ImageBackground>
        </Block>
       
      );
    }else{
      // Authendicating
      return (<Loader />);
    }
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    showIntro: state.auth.showIntro,
    isLoading: state.common.isLoading,
    user: state.auth.user,
    language: getLanguage(state.settings.languageId),
    languageSet: state.settings.languageSet || 0,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      signinAction: (values) => dispatch(userActions.signin(values)),
      setLanguage: () => dispatch(settingActions.setLanguage({id:1,set:1})),
      showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
      resetState: () => {
        dispatch(settingActions.setLanguage({id:0,set:0}))
        dispatch({ type: ActionTypes.RESETSTATE })
      }
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);