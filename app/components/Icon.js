import React, {memo} from "react";
import { View } from "react-native";
import { createIconSet, createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";

const Icon = props => {
  const Icomoon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon");
  return (
    <View>
      <Icomoon color={props.color} size={props.size} name={props.name} />
    </View>
  );
};

export default createIconSet(icoMoonConfig, 'icomoon', '../assets/fonts/icomoon.ttf')

// export default createIconSetFromIcoMoon(icoMoonConfig, 'icomoon');

// https://github.com/WrathChaos/react-native-custom-icon
// https://github.com/EmaSuriano/custom-icons-react-native
// https://levelup.gitconnected.com/custom-icons-and-typographies-in-react-native-460e970d3147
// https://freakycoder.com/react-native-library-react-native-custom-icon-1ec0b734d691