import { Platform, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const baseSize = 16;

const scale = size => Math.round(width / guidelineBaseWidth * size);
const verticalScale = size => Math.round(height / guidelineBaseHeight * size);
const moderateScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);

const indent = moderateScale(baseSize);

const colors = {

  primary: '#7f71e7',
  primaryDark: '#695bd1',
  primaryLight: '#B4AEE8',
  secondary: '#f58c23',
  secondaryDark: '#BC6207',
  secondaryLight: '#F49F49',
  accent: "#F3534A",
  tertiary: "#FFE358",
  white: '#FFFFFF',
  lightWhite:'#dfdfdf',
  black:'#323643',
  lightBlack:'#50535d',
  lightBlack1:'#696b72',
  red:'#ee0701',
  green:'#24b124',
  gray: "#838a9c",
  gray2: "#acb5c1",
  gray3: "#8d96a2",

  icon: '#000000',
  iconSet: [ '#088da5','#8a2be2','#133337','#666666','#008080','#ffa500','#003366','#008000','#660066','#8b0000','#ff4040','#3399ff','#101010','#BC70A4','#FF6F61','#9B1B30','#6B5B95','#615550','#77212E','#FA9A85','#5A3E36','#CE5B78','#935529','#E08119','#2A4B7C','#577284','#F96714','#264E36','#2A293E','#616247','#9F9C99','#797B3A','#DD4132','#9E1030','#FE840E','#FF6F61','#8D9440','#C62168','#00539C','#755139','#343148','#6B5B95','#7F4145','#BD3D3A','#3F69AA','#766F57','#E47A2E','#006E6D','#E94B3C','#944743','#00A591','#6B5B95','#6C4F3D','#2E4A62','#92B558','#DC4C46','#672E3B','#C48F65','#223A5E','#898E8C','#005960','#9C9A40','#4F84C4','#D2691E','#578CA9','#004B8D','#F2552C','#CE3175','#5A7247','#4C6A92','#838487','#B93A32','#AF9483','#AD5D5D','#006E51','#9E4624','#F7786B','#91A8D0','#034F84','#DD4132','#6B5B95','#88B04B','#955251','#B565A7','#009B77','#DD4124','#D65076','#45B8AC','#EFC050','#5B5EA6','#9B2335','#BC243C','#C3447A','#ff0000','#800000','#800080','#0e2f44']
};

const sizes = {
  // global sizes
  base: baseSize,
  font: 14,
  radius: 0,
  padding: 25,

  // font sizes
  h1: 36,
  h2: 31,
  h3: 28,
  h4: 24,
  h5: 20,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  small: 10,

  // General
  window: {
    width,
    height,
  },
  statusBarHeight:Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  scale,
  verticalScale,
  moderateScale,
  indent,
  indentsmall:moderateScale(indent / 3),
  indenthalf:moderateScale(indent / 2),
  indent2x:moderateScale(indent * 2),
  indent3x:moderateScale(indent * 3),
  indent4x:moderateScale(indent * 4),
  indent5x:moderateScale(indent * 5),
  indent6x:moderateScale(indent * 6),
  indentY:verticalScale(indent),
  indentYhalf:verticalScale(indent / 2),
  indentY2x:verticalScale(indent * 2),
  indentY3x:verticalScale(indent * 3),
  indentY4x:verticalScale(indent * 4),
  iconSize:moderateScale(baseSize*2),
  midIconSize:moderateScale(baseSize*2.5),
  bigIconSize:moderateScale(baseSize*3),
  isSmallDevice: width < 375,
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  h4: {
    fontSize: sizes.h4
  },
  h5: {
    fontSize: sizes.h5
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
  small: {
    fontSize: sizes.small
  },
};


export { colors, sizes, fonts };