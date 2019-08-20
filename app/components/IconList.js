import React from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Colors, Layout, ActionTypes } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';

class IconList extends React.Component {
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
    return {
      showModal: () => {
        dispatch({ type: ActionTypes.SHOWMODAL, showModal: true })
      },
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(IconList);