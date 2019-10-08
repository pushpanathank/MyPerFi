import React, {Component, memo} from "react";
import { View, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import { Spinner } from 'native-base';
import appStyles from '../../theme/appStyles';
import { ActionTypes, IconList, Theme } from '../../constants';
import { getLanguage } from '../../utils/common';
import Block from '../Block';
import Icon from './Icon';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';

const iconBills = IconList.iconBills;

class IconBillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };

    setTimeout(()=>{
      this.setState({data: Object.values(iconBills)});
    },50)

  }
  render() {
    return (
        <Block block padding={Theme.sizes.indent}>
            <ScrollView showsVerticalScrollIndicator={false} style={[appStyles.contentBg]}>
              <Block>
              { this.state.data ? 
                <FlatList
                data={this.state.data}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Block center middle>
                      <Button 
                      style={[appStyles.catIcon,appStyles.catIconBig,{backgroundColor:item.color, marginBottom: Theme.sizes.indentsmall}]}
                      onPress={() => this.props.selectedType(item)}>
                          <Icon name={item.icon} size={20} />
                      </Button>
                      <Text small gray style={{marginBottom: Theme.sizes.indentsmall}}>{this.props.language[item.icon]}</Text>
                  </Block>
                )}
              />: <Spinner color={Theme.colors.secondary} />}
            </Block>
            </ScrollView>
        </Block>
    );
  }
}

const mapStateToProps = (state) => {
  let language = getLanguage(state.settings.languageId);
  return {
    language: language,
  };
};

export default connect(mapStateToProps, null)(memo(IconBillsList));