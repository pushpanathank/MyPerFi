import React from "react";
import { View } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from "react-navigation";

import {
  Header,
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Theme, ActionTypes } from '../constants';
import Logo from './Logo';
import Icon from './Icons/Icon';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import withPreventDoubleClick from './withPreventDoubleClick';

const ButtonEx = withPreventDoubleClick(Button);

class Headers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Header transparent>
          <Block row style={{flex:1}}>
            { this.props.leftIcon ? this.props.leftIcon : <Text/> }
          </Block>
          <Block row middle center style={{flex:4}}>
            <Text h5 white numberOfLines={1}>{this.props.title}</Text>
          </Block>
          <Block row right style={{flex:this.props.rightFlex||1}}>
            { this.props.rightIcon ? this.props.rightIcon : <Text/> }
          </Block>
        </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
      goBack: () => dispatch(NavigationActions.back()),
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);