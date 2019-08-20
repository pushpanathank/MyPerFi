import React from "react";
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button,
  Text,
  List, ListItem
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Colors, Layout, ActionTypes, IconList as iconList } from '../constants';
import Svgicon from './Svgicon';

class IconList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View>
          <List
              dataArray={iconList}
              keyExtractor={(item, index) => index.toString()} 
              contentContainerStyle={appStyles.iconList}
              horizontal={false}
              numColumns={4}
              renderRow={(data) => {
                return (
                  <View style={{width:'25%'}}>
                    <Button 
                    style={[appStyles.iconListItem,{backgroundColor:data.color}]}
                    onPress={() => this.props.navigation.navigate(data.route)}>
                        <Svgicon 
                          style={appStyles.iconListSingle} 
                          color={Colors.white} 
                          name={data.icon} 
                          width={22} 
                          height={22} />
                    </Button>
                    <Text style={appStyles.iconListText}>{data.label}</Text>
                  </View>
                );
              }}
            />
        </View>
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