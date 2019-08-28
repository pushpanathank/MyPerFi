import React from 'react';
import { Switch, Platform } from 'react-native';

import { Theme } from '../constants';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

export default class SwitchInput extends React.PureComponent {
  render() {
    const { value, ...props } = this.props;
    let thumbColor = null;

    if (Platform.OS === 'android') {
      thumbColor = GRAY_COLOR;
      if (props.value) thumbColor = Theme.colors.secondary;
    }

    return (
      <Switch
        thumbColor={thumbColor}
        ios_backgroundColor={GRAY_COLOR}
        trackColor={{
          // false: GRAY_COLOR,
          true: Theme.colors.secondary
        }}
        value={value}
        {...props}
      />
    );
  }
}
