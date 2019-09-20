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
import { IconBack, Button, Block, Text, Icon, Input, Headers } from '../../components';
import { getLanguage } from '../../utils/common';
import imgs from '../../assets/images';
import { validationService } from '../../utils/validation';
import { userActions } from "../../actions";
import appStyles from '../../theme/appStyles';
import styles from './styles';


class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      authInputs: {
        email: {
          type: "email",
          value: ""
        },
      },
      validForm: true,
    };
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    this.getFormValidation({obj:'authInputs'});
    if(this.state.validForm){

    }
  }

  render(){
    const { language } = this.props;
    const { authInputs } = this.state;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Theme.sizes.window.width, height: Theme.sizes.window.height }}>
          <Headers 
            {...this.props} 
            title={''} 
            leftIcon={<IconBack />} 
            />
          <Content enableOnAndroid>
            <View style={{flexDirection: 'column', flex:1}}>
              <View style={{flex: 0.8,height: Theme.sizes.window.height-160,}}>
                <Block flex={false} center>
                  <Animatable.Text 
                    animation="fadeInDown"
                    style={appStyles.loginTitle}>{language.forgot}</Animatable.Text>
                </Block> 

                <Block padding={[Theme.sizes.indent]}>
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}
                    style={styles.loginBox}>
                    <Input
                        textColor={Theme.colors.white}
                        leftIcon={<Icon name='email' size='20'/>}
                        borderColor={Theme.colors.white}
                        activeBorderColor={Theme.colors.white}
                        error={this.renderError('authInputs', 'email', 'email')}
                        returnKeyType={"next"}
                        value={authInputs.email.value}
                        onChangeText={value => {this.onInputChange({ field: "email", value, obj:'authInputs' });}}
                        containerStyle={{marginBottom: Theme.sizes.indent3x}}
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
                      onPress={() => this.reset()}
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
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);