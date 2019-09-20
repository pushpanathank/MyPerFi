import React, { memo } from "react";
import { DrawerActions } from "react-navigation";

import appStyles from '../../theme/appStyles';
import Icon from './Icon';
import Button from '../Button';

class IconButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button ripple
        onPress={() => this.props.onPress()}
        style={[appStyles.menuIcon, this.props.style]}
      >
        <Icon name={this.props.icon} size="26"/>
      </Button> 
    );
  }
}

export default memo(IconButton);