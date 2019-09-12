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
      data: Object.values(iconList.iconListArray),
    };
  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = Object.values(iconList).filter(item => {
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
              <Block margin={[Theme.sizes.indent,0,0,0]}>
                <FlatList
                data={this.state.data}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                maxToRenderPerBatch={40}
                updateCellsBatchingPeriod={100}
                initialNumToRender={40}
                windowSize={400}
                legacyImplementation={true}
                renderItem={({ item }) => (
                  <Block center middle>
                          <Button 
                          style={[appStyles.catIcon,appStyles.catIconBig,{backgroundColor:item.color, marginBottom: Theme.sizes.indent}]}
                          onPress={() => this.props.selectedColor(item)}>
                              <Svgicon 
                                style={appStyles.iconListSingle} 
                                color={Colors.white} 
                                name={item.icon} 
                                width={22} 
                                height={22} />
                          </Button>
                  </Block>
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