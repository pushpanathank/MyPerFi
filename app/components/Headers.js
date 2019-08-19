import React from "react";
import { View } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import SvgIcon from 'react-native-svg-icon';
import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';

import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';

class Headers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Header transparent>
          <Left style={appStyles.row}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Svgicon color={Colors.white} name="menu" />
            </Button>
          </Left>
          <Body style={appStyles.rowXcenter}>
            <Logo header={true} />
          </Body>
          <Right style={appStyles.row}>
            <Button transparent>
              <Svgicon color={Colors.white} name="bell" />
            </Button>
          </Right>
        </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);