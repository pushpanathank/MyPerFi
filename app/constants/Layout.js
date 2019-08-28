import { Platform, Dimensions, StatusBar } from 'react-native';
// import Constants from 'expo-constants';

import * as theme from './Theme';

const statusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => Math.round(width / guidelineBaseWidth * size);
const verticalScale = size => Math.round(height / guidelineBaseHeight * size);
const moderateScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);

const indent = moderateScale(theme.sizes.base);
const halfIndent = moderateScale(indent / 2);
const doubleIndent = moderateScale(indent * 2);
const tripleIndent = moderateScale(indent * 3);
const fourIndent = moderateScale(indent * 4);
const sixIndent = moderateScale(indent * 6);

const verticalIndent = verticalScale(indent);
const halfVerticalIndent = verticalScale(indent / 2);

const iconSize = moderateScale(35);
const bigIconSize = moderateScale(50);

export default {
	window: {
		width,
		height,
	},
	statusBarHeight,
	scale,
	verticalScale,
	moderateScale,
	indent,
	halfIndent,
	doubleIndent,
	tripleIndent,
	fourIndent,
	sixIndent,
	verticalIndent,
	halfVerticalIndent,
	iconSize,
	bigIconSize,
	isSmallDevice: width < 375,
};