import React, {Component, memo} from "react";
import { View, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from 'native-base';
import appStyles from '../../theme/appStyles';
import { ActionTypes, IconList as iconList, Theme } from '../../constants';
import Block from '../Block';
import Icon from './Icon';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';

class IconList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };

    setTimeout(()=>{
      this.setState({data: iconList.iconListArray});
    },50)

  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = iconList.iconListArray.filter(item => {
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
            <Block flex={false}>
              <Input 
                placeholder="Search"
                leftIcon={<Icon name='search' color={Theme.colors.lightBlack} size={20}/>}
                rightIcon={<Icon name='close' color={Theme.colors.lightBlack} size={30}/>}
                onChangeText={text => this.searchFilterFunction(text)}
                borderColor={Theme.colors.gray}
                activeBorderColor={Theme.colors.gray2}
              />
              {/* <TouchableWithoutFeedback onPress={this.clear}>
                <Icon name='close' color={Theme.colors.lightBlack} size={30}/>
              </TouchableWithoutFeedback> */}
            </Block>
            <ScrollView showsVerticalScrollIndicator={false} style={[appStyles.contentBg]}>
              <Block margin={[Theme.sizes.indent,0,0,0]}>
              { this.state.data ? 
                <FlatList
                data={this.state.data}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Block center middle>
                      <Button 
                      style={[appStyles.catIcon,appStyles.catIconBig,{backgroundColor:item.color, marginBottom: Theme.sizes.indentsmall}]}
                      onPress={() => this.props.selectedCategory(item)}>
                          <Icon name={item.icon} size={20} />
                      </Button>
                      <Text caption gray style={{marginBottom: Theme.sizes.indent}}>{item.label}</Text>
                  </Block>
                )}
              />: <Spinner color={Theme.colors.secondary} />}
            </Block>
            </ScrollView>
        </Block>
    );
  }
}

export default memo(IconList);

/*
removeClippedSubviews={true}
maxToRenderPerBatch={40}
updateCellsBatchingPeriod={1}
initialNumToRender={40}
windowSize={100}
legacyImplementation={true}*/