import React from "react";
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button, Item, Icon, Input,
  Text,
  List, ListItem
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Colors, Layout, ActionTypes, IconList as iconList } from '../constants';
import Svgicon from './Svgicon';

class IconList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: iconList,
    };
  }
  searchFilterFunction = text => {
    console.log("text", text);
    this.setState({
      value: text,
    });

    const newData = iconList.filter(item => {
      const itemData = `${item.label.toUpperCase()} ${item.icon.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  render() {
    return (
        <View>
          <Item>
            <Svgicon name='search' color={Colors.lightBlack} width={20} height={20}/>
            <Input 
              placeholder="Search"
              onChangeText={text => this.searchFilterFunction(text)}
              style={{paddingLeft:Layout.indent, paddingRight:Layout.indent}}
            />
            <Svgicon name='close' color={Colors.lightBlack} width={30} height={30}/>
          </Item>
          <List
              dataArray={this.state.data}
              keyExtractor={(item, index) => index.toString()} 
              contentContainerStyle={appStyles.iconList}
              horizontal={false}
              numColumns={4}
              renderRow={(data) => {
                return (
                  <View style={{width:'25%'}}>
                    <Button 
                    style={[appStyles.iconListItem,{backgroundColor:data.color}]}
                    onPress={() => this.props.selectedColor(data)}>
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