import React from "react";
import {
  Button,
} from 'native-base';
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import appStyles from '../theme/appStyles';
import Icon from './Icon';
import Button from './Button';

class BackIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button 
        onPress={() => this.props.goBack()}
        style={appStyles.loginBack}
      >
        <Icon name="arrow-back" style={appStyles.backIcon} />
      </Button> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      goBack: () => dispatch(NavigationActions.back()),
   };
};

export default connect(null, mapDispatchToProps)(BackIcon);