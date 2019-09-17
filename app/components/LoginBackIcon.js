import React from "react";
import {
  Button,
} from 'native-base';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { Screens } from '../constants';
import appStyles from '../theme/appStyles';
import Icon from './Icon';

class LoginBackIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button transparent full
        onPress={() => this.props.goBack()}
        style={appStyles.loginBack}
      >
        <Icon name="arrow-back" style={appStyles.loginBackIcon} />
      </Button> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      goBack: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignIn.route })),
   };
};

// Exports
export default connect(null, mapDispatchToProps)(LoginBackIcon);