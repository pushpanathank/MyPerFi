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
import { submit } from 'redux-form';
import * as Animatable from 'react-native-animatable';

import { Theme, Screens } from '../../constants';
import { BackIcon, Button, Block, Text } from '../../components';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import ForgotForm from './form';

class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
  }

  reset(values, dispatch, props){
    dispatch(userActions.forgotpassword(values))
      .then(res => {
        if(res.status == 200){
          showToast(res.msg,"success");
          dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
          // this.props.navigation.navigate(Screens.SignInStack.route)
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

  render(){
    const { language } = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Content enableOnAndroid>
            <View style={{flexDirection: 'column', flex:1}}>
              <View style={{flex: 0.8,height: Theme.sizes.window.height-80,}}>
                <View style={appStyles.row}>
                  <BackIcon props={this.props} /> 
                  <Animatable.Text 
                    animation="fadeInDown"
                    style={appStyles.loginTitle}>{language.forgot}</Animatable.Text>
                </View> 

                <Animatable.View 
                  animation="fadeInUp"
                  delay={500}
                  style={styles.loginBox}>
                  <ForgotForm onSubmit={this.reset} />
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
                      onPress={() => this.props.pressReset()}
                    >
                      <Text center white transform="uppercase"> {language.reset} </Text>
                    </Button>
                }
              </Animatable.View>  
            </View>          
          </Content>
         </ImageBackground>
      </Container>
     
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
    return {
      pressReset: () => dispatch(submit('forgotForm')),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);