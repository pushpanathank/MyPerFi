import React from 'react'
import { StyleSheet, View, ImageBackground, FlatList} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens, Strings } from '../../constants';
import { Logo, Svgicon, Headers, IconList, MyText } from '../../components';
import imgs from '../../assets/images';
import {
  Container, Content, Icon, Spinner, Button, Text,
  Header, Left, Body, Title, Right, List, ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Settings extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render(){
    const {language} = this.props;
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <View style={[appStyles.heading50]}>
              <Text style={appStyles.headingText}>{language.settings}</Text>
            </View>
            <View style={[appStyles.contentBg]}>

                    <List
                    dataArray={[{ key: 'a', value: 'Citibank' }, { key: 'b', value: 'SBI Bank' }, { key: 'c', value: 'Row three' }, { key: 'd', value: 'Row four' }, { key: 'e', value: 'Row five' }]}
                    contentContainerStyle={appStyles.accList}
                    keyExtractor={(item, index) => index.toString()} 
                    horizontal={false}
                    renderRow={(data) => {
                      return (
                        <ListItem transparent noIndent 
                            onPress={() => this.props.selectedColor(data)}>                                
                            <Body>
                              <MyText text={data.value} />
                              <MyText text={'x8477'} size={11} color={Colors.lightBlack1}/>
                            </Body>
                            <Right>
                            <Text>{'\u20B9 \u0024 \u20AC'}</Text>
                              <MyText text={'10,000'} />
                              <MyText text={'Estimated Bal'} size={11} color={Colors.lightBlack1}/>
                            </Right>
                        </ListItem>
                      );
                    }}
                  />

            </View>
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Settings);