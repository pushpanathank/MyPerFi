import React from "react";
import { View, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button, Item, Icon, Input,
  Text,
  List, ListItem
} from 'native-base';

import appStyles from '../theme/appStyles';
import { Colors, Layout, ActionTypes, IconList as iconList, Theme } from '../constants';
import Svgicon from './Svgicon';
import Block from './Block';

class IconList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: iconList,
    };
  }
  searchFilterFunction = text => {
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
  clear = ()=>{
    this.setState({
      value: '',
    });
  }
  render() {
    return (
        <Block block padding={Theme.sizes.indent}>
            <Item>
              <Svgicon name='search' color={Colors.lightBlack} width={20} height={20}/>
              <Input 
                placeholder="Search"
                onChangeText={text => this.searchFilterFunction(text)}
                style={{paddingLeft:Layout.indent, paddingRight:Layout.indent}}
              />
              <TouchableWithoutFeedback onPress={this.clear}>
                <Svgicon name='close' color={Colors.lightBlack} width={30} height={30}/>
              </TouchableWithoutFeedback>
            </Item>
            <ScrollView showsVerticalScrollIndicator={false} style={[appStyles.contentBg]}>
              <Block>
                <FlatList
                data={this.state.data}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{width:'25%'}}>
                          <Button 
                          style={[appStyles.iconListItem,{backgroundColor:item.color}]}
                          onPress={() => this.props.selectedColor(item)}>
                              <Svgicon 
                                style={appStyles.iconListSingle} 
                                color={Colors.white} 
                                name={item.icon} 
                                width={22} 
                                height={22} />
                          </Button>
                          <Text style={appStyles.iconListText}>{item.label}</Text>
                        </View>
                )}
              />
            </Block>
            </ScrollView>
        </Block>
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