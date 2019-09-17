import React from "react";
import { View } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from "react-navigation";

import {
  Button,
  Header,
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Theme, ActionTypes } from '../constants';
import Logo from './Logo';
import Icon from './Icon';
import Text from './Text';
import Block from './Block';
import withPreventDoubleClick from './withPreventDoubleClick';

const ButtonEx = withPreventDoubleClick(Button);

class HeadersWithTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Header transparent>
          <Block row left style={{flex:1}}>
            { this.props.leftIcon ? (
              this.props.leftIcon == 'back' ?
              <Button transparent style={appStyles.menuBtn} onPress={() => this.props.goBack()}>
                <Icon name="back_arrow" size={25} />
              </Button> 
              :
              <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" size={30} />
              </Button>
              ) : <Text/>
            }
          </Block>
          <Block row middle center style={{flex:4}}>
            <Text h5 white numberOfLines={1}>{this.props.title}</Text>
          </Block>
          <Block row right style={{flex:1}}>
            { this.props.rightIcon ? (
              this.props.rightIcon ?
              <ButtonEx transparent onPress={() => this.props.onPressRight()}>
                <Icon name={this.props.rightIcon} size={24} />
              </ButtonEx>
              :
              <Button transparent>
                <Icon name="bell" size={23} />
                <View style={{ position: 'absolute', right:5, top:5, width:20, height:20, padding:0, margin:0, backgroundColor: Theme.colors.accent, borderRadius:10 }}>
                  <Text style={{ fontSize: 11, color: "#fff", position: 'absolute',right:10, top:4,}}>2</Text>
                </View>
              </Button>
              ) : <Text/>
            }
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
export default connect(mapStateToProps, mapDispatchToProps)(HeadersWithTitle);