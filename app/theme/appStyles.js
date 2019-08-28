import { StyleSheet } from 'react-native';
import { Colors, Layout, Theme } from '../constants/';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
  },
  statusBar:{
    flex: 1,
    height:Theme.sizes.statusBarHeight
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
    backgroundColor: Theme.colors.secondary,
    fontFamily: 'Font-Regular',
  },
  myText:{
    fontFamily: 'Font-Regular',
  },
  padding:{
    padding: Theme.sizes.indent,
  },


  content:{
    // marginTop: Theme.sizes.indent,
    // paddingLeft: Theme.sizes.indent,
    // paddingRight: Theme.sizes.indent,
    flex:1
  },
  contentBg:{
    backgroundColor: Theme.colors.white,
    flex:1,
    height: Theme.sizes.window.height-130,
  },
  contentBg60:{
    height: Theme.sizes.window.height-110,
  },
  contentBg100:{
    height: Theme.sizes.window.height-190,
  },
  contentBg150:{
    height: Theme.sizes.window.height-240,
  },
  heading50:{
    height:Theme.sizes.moderateScale(50),
    paddingLeft: Theme.sizes.indent,
    paddingRight: Theme.sizes.indent,
  },
  heading60:{
    height:Theme.sizes.moderateScale(60),
    paddingLeft: Theme.sizes.indent,
    paddingRight: Theme.sizes.indent,
  },
  heading100:{
    height:Theme.sizes.moderateScale(100),
    paddingLeft: Theme.sizes.indent,
    paddingRight: Theme.sizes.indent,
  },
  heading150:{
    height:Theme.sizes.moderateScale(150),
    paddingLeft: Theme.sizes.indent,
    paddingRight: Theme.sizes.indent,
  },
  headingText:{
    color: Theme.colors.white,
    fontSize: Theme.sizes.moderateScale(25),
    fontFamily: 'Font-Light',
  },
  subheadingText:{
    color: Theme.colors.white,
    fontSize: Theme.sizes.moderateScale(14),
    fontFamily: 'Font-Light',
    color: Theme.colors.lightWhite
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
    marginBottom: Theme.sizes.indenthalf,
  },
  introLangBtnActive:{
    backgroundColor: Theme.colors.secondary,
  },
  // Slider
  slide:{
    backgroundColor: Theme.colors.primary,
    flex:1
  },
  slideTitle:{
    color: Theme.colors.white,
    fontSize: 30,
    textAlign:'center',
  },
  slideText:{
    textAlign:'center',
    color: Theme.colors.lightWhite
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  slideIcon: {
    backgroundColor: 'transparent', 
    color: Theme.colors.white
  },
  buttonCircle: {
    width: 40,
    height: 40,
    color: Theme.colors.white,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle:{
    backgroundColor: Theme.colors.secondary
  },

  menuBtn:{
    padding: Theme.sizes.indent
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
    paddingRight: Theme.sizes.indent,
  },
  drawerText:{
    fontSize: 14, 
    color: Theme.colors.black,
    paddingLeft: Theme.sizes.indent,
    fontFamily: 'Font-Regular',
    color: Theme.colors.lightBlack
  },
  profileName:{
    color: Theme.colors.white,
    fontSize: 22
  },
  profileEmail:{
    color: Theme.colors.lightWhite,
    fontSize: 14
  },
  activeDrawerItem:{
    // backgroundColor: Theme.colors.primaryLight
  },

  iconList:{
    justifyContent: 'space-around',
  },
  iconListItem:{
    width: Theme.sizes.bigIconSize,
    height:Theme.sizes.bigIconSize,
    borderRadius:25,
    padding:0,
    margin:Theme.sizes.indent, 
    justifyContent:'center',
  },
  iconListSingle:{

  },
  iconListText:{
    textAlign:'center',
    fontSize:10,
    marginTop:-Theme.sizes.indenthalf,
    fontFamily:'Font-Regular',
    color: Theme.colors.lightBlack
  },

  // Account
  tabBarUnderlineStyle:{
    backgroundColor: Theme.colors.secondary
  },
  tabsAcc:{
    backgroundColor: Theme.colors.primary,
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
    marginTop: Theme.sizes.indent6x,
    width: 220,
    height: 68, 
    // marginTop: Theme.sizes.fourIndent,
    // width: 80
  },

  loginMidText:{
    fontSize: 16,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -Theme.sizes.indent2x,
    color:Theme.colors.lightWhite
  },
  loginTitle:{
    fontSize: 30,
    color:Theme.colors.white,
    marginLeft: Theme.sizes.indent,
    textAlign:'center',
    fontFamily: 'Font-Regular',
  },
  loginBack:{
    marginTop:Theme.sizes.indent2x,
    justifyContent:'flex-start',
  },
  loginBackIcon:{
    color: Theme.colors.white
  },

  // Input
  itemInput:{

  },
  textbox:{
    marginTop:15,
    color: Theme.colors.white,
    width:100,
    paddingLeft:Theme.sizes.indent,
    paddingRight:Theme.sizes.indent,
    fontFamily: 'Font-Regular',
    fontSize:14
  },
  inputIcon:{
    marginTop: Theme.sizes.indent,
    marginLeft: Theme.sizes.indent,
  },
  inputError:{
    color: Theme.colors.red,
    top:20,
    fontSize:12
  }
});