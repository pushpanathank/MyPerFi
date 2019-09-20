import React, { memo } from "react";
import { DrawerActions } from "react-navigation";

import appStyles from '../../theme/appStyles';
import Icon from './Icon';
import Button from '../Button';

class IconMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button ripple
        onPress={() => this.props.navigation.openDrawer()}
        style={[appStyles.menuIcon,{marginTop:0}]}
      >
        <Icon name="menu" size="26"/>
      </Button> 
    );
  }
}

export default memo(IconMenu);