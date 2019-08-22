import { StyleSheet } from 'react-native';
import { Colors, Layout } from '../constants/';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  statusBar:{
    flex: 1,
    height:Layout.statusBarHeight
  },
  row: {
    flex: 1,
  },
  rowXYcenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowXcenter: {
    flex: 1,
    alignItems: 'center'
  },
  rowYcenter: {
    flex: 1,
    justifyContent: 'center',
  },
  fontRegular:{
    fontFamily: 'Font-Regular',
  },
  btnSecontary:{
    backgroundColor: Colors.secondary,
    fontFamily: 'Font-Regular',
  },
  myText:{
    fontFamily: 'Font-Regular',
  },


  content:{
    // marginTop: Layout.indent,
    // paddingLeft: Layout.indent,
    // paddingRight: Layout.indent,
    flex:1
  },
  contentBg:{
    backgroundColor: Colors.white,
    padding: Layout.indent,
    flex:1,
    height: Layout.window.height-130,
  },
  contentBg60:{
    height: Layout.window.height-110,
  },
  contentBg150:{
    height: Layout.window.height-240,
  },
  contentBgAccount:{
    backgroundColor: Colors.white,
    flex:1,
    height: Layout.window.height-240,
  },
  heading50:{
    height:Layout.moderateScale(50),
    paddingLeft: Layout.indent,
    paddingRight: Layout.indent,
  },
  heading60:{
    height:Layout.moderateScale(60),
    paddingLeft: Layout.indent,
    paddingRight: Layout.indent,
  },
  heading150:{
    height:Layout.moderateScale(150),
    paddingLeft: Layout.indent,
    paddingRight: Layout.indent,
  },
  headingText:{
    color: Colors.white,
    fontSize: Layout.moderateScale(25),
    fontFamily: 'Font-Light',
  },
  subheadingText:{
    color: Colors.white,
    fontSize: Layout.moderateScale(14),
    fontFamily: 'Font-Light',
    color: Colors.lightWhite
  },

  setLanguage: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius:0
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  introLangBtn:{
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '50%',
    marginLeft: '25%',
    marginBottom: Layout.halfIndent,
  },
  introLangBtnActive:{
    backgroundColor: Colors.secondary,
  },
  // Slider
  slide:{
    backgroundColor: Colors.primary,
    flex:1
  },
  slideTitle:{
    color: Colors.white,
    fontSize: 30,
    textAlign:'center',
  },
  slideText:{
    textAlign:'center',
    color: Colors.lightWhite
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  slideIcon: {
    backgroundColor: 'transparent', 
    color: Colors.white
  },
  buttonCircle: {
    width: 40,
    height: 40,
    color: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle:{
    backgroundColor: Colors.secondary
  },

  menuBtn:{
    padding: Layout.indent
  },
  drawerList:{
    margin:0,
    paddingLeft:0
  },
  drawerItem:{
    margin:0,
    padding:0
  },
  drawerIcon:{
    paddingRight: Layout.indent,
  },
  drawerText:{
    fontSize: 14, 
    color: Colors.black,
    paddingLeft: Layout.indent,
    fontFamily: 'Font-Regular',
    color: Colors.lightBlack
  },
  profileName:{
    color: Colors.white,
    fontSize: 22
  },
  profileEmail:{
    color: Colors.lightWhite,
    fontSize: 14
  },
  activeDrawerItem:{
    // backgroundColor: Colors.primaryLight
  },

  iconList:{
    justifyContent: 'space-around',
  },
  iconListItem:{
    width: Layout.bigIconSize,
    height:Layout.bigIconSize,
    borderRadius:25,
    padding:0,
    margin:Layout.indent, 
    justifyContent:'center',
  },
  iconListSingle:{

  },
  iconListText:{
    textAlign:'center',
    fontSize:10,
    marginTop:-Layout.halfIndent,
    fontFamily:'Font-Regular',
    color: Colors.lightBlack
  },

  // Account
  tabBarUnderlineStyle:{
    backgroundColor: Colors.secondary
  },
  tabsAcc:{
    backgroundColor: Colors.primary,
  },
  tabStyleAcc:{
    width:'50%'
  },
  accList:{
    backgroundColor: 'transparent'
  },


  logo: {

  },
  headerLogo:{
    height: 40, 
    width: 120
  },
  loaderLogo: {
    height: 68, 
    width: 220
    // width: 70
  },
  loginLogo: {
    marginTop: Layout.sixIndent,
    width: 220,
    height: 68, 
    // marginTop: Layout.fourIndent,
    // width: 80
  },

  loginMidText:{
    fontSize: 16,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -Layout.doubleIndent,
    color:Colors.lightWhite
  },
  loginTitle:{
    fontSize: 30,
    color:Colors.white,
    marginLeft: Layout.indent,
    textAlign:'center',
    fontFamily: 'Font-Regular',
  },
  loginBack:{
    marginTop:Layout.doubleIndent,
    justifyContent:'flex-start',
  },
  loginBackIcon:{
    color: Colors.white
  },

  // Input
  itemInput:{

  },
  textbox:{
    marginTop:15,
    color: Colors.white,
    width:100,
    paddingLeft:Layout.indent,
    paddingRight:Layout.indent,
    fontFamily: 'Font-Regular',
    fontSize:14
  },
  inputIcon:{
    marginTop: Layout.indent,
    marginLeft: Layout.indent,
  },
  inputError:{
    color: Colors.red,
    top:20,
    fontSize:12
  }
});