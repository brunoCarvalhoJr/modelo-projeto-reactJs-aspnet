import React from 'react';
import {ImageStyle, StyleSheet} from 'react-native';
import {IconOutline, OutlineGlyphMapType} from '@ant-design/icons-react-native';

interface StyleProps extends ImageStyle {
  tintColor: string | undefined;
  height: number | undefined;
}

interface Props {
  name: OutlineGlyphMapType;
  style: StyleProps;
}

export const AntIconsPack = {
  name: 'Ant',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name: OutlineGlyphMapType) {
        return IconProvider(name);
      },
    },
  );
}

const IconProvider = (name: OutlineGlyphMapType) => ({
  toReactElement: (props: Props) => AntIcon({...props, name}),
});

function AntIcon({name, style}: Props) {
  const {height, tintColor} = StyleSheet.flatten(style);
  return <IconOutline name={name} size={height} color={tintColor} />;
}
