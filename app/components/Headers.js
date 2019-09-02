import React from "react";
import { View } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button, Badge,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Theme, ActionTypes } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibleModal:false
    }
  }
  render() {
    return (
        <Header transparent>
          <Left style={appStyles.row}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Svgicon color={Theme.colors.white} name="menu" width={30} />
            </Button>
          </Left>
          <Body style={appStyles.rowXcenter}>
            <Logo header={true} />
          </Body>
          <Right style={appStyles.row}>
            <Button transparent>
              <Svgicon color={Theme.colors.white} name="bell" width={23} />
              <View style={{ position: 'absolute', right:5, top:5, width:20, height:20, padding:0, margin:0, backgroundColor: Theme.colors.accent, borderRadius:10 }}>
                <Text style={{ fontSize: 11, color: "#fff", position: 'absolute',right:10, top:4,}}>2</Text>
              </View>
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