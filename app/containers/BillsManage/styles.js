import { StyleSheet } from 'react-native';
import { Theme } from '../../constants/';
export default {
  container: {
    padding: Theme.sizes.indent,
  },
  errorStyle:{
  	bottom: Theme.sizes.indent*1.2
  },
  borderBottom:{
  	borderBottomWidth: StyleSheet.hairlineWidth, 
  	borderBottomColor: Theme.colors.gray
  },
  picker:{
  	height: Theme.sizes.indent3x, 
  	width: '100%',
  },
  pickerItem:{
  	height: 25,
  },
  typeIcon:{
  	marginHorizontal:Theme.sizes.indent,
  	padding: Theme.sizes.indenthalf,
  	borderColor: 'rgba(0, 0, 0, 0.5)',
  }
};