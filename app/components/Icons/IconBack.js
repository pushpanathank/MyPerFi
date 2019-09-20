import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import appStyles from '../../theme/appStyles';
import Icon from './Icon';
import Button from '../Button';

class IconBack extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button ripple
        onPress={() => this.props.goBack()}
        style={[appStyles.backIcon, this.props.style]}
      >
        <Icon name="back_arrow" size="26"/>
      </Button> 
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      goBack: () => dispatch(NavigationActions.back()),
   };
};

export default connect(null, mapDispatchToProps)(IconBack);