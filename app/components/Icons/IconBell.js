import React, { memo } from "react";
import { View } from "react-native";
import { DrawerActions } from "react-navigation";

import { Theme } from '../../constants';
import appStyles from '../../theme/appStyles';
import Icon from './Icon';
import Button from '../Button';
import Text from '../Text';

class IconBell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button ripple
        onPress={() => this.props.navigation.openDrawer()}
        style={appStyles.menuIcon}
      >
        <Icon name="bell" size="24"/>
        <View style={{ position: 'absolute', right:5, top:5, width:20, height:20, padding:0, margin:0, backgroundColor: Theme.colors.accent, borderRadius:10 }}>
          <Text style={{ fontSize: 11, color: "#fff", position: 'absolute',right:10, top:4,}}>2</Text>
        </View>
      </Button> 
    );
  }
}

export default memo(IconBell);