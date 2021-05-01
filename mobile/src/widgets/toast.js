import Toast from 'react-native-tiny-toast';

const WHITE = '#f2f2f2';
const SUCCESS = '#2ECC71';
const DANGER = '#D00000';

export function show(message, options) {
  return Toast.show(message, options);
}

export function showSuccess(
  message,
  options = {
    position: Toast.position.BOTTOM,
    containerStyle: {
      backgroundColor: SUCCESS,
      borderRadius: 15,
    },
    textStyle: {
      color: WHITE,
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    animation: true,
  },
) {
  return Toast.show(message, options);
}

export function showError(message, duration = 2000) {
  return Toast.show(message, {
    position: Toast.position.BOTTOM,
    containerStyle: {
      backgroundColor: DANGER,
      borderRadius: 15,
    },
    textStyle: {
      color: WHITE,
    },
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration,
    animation: true,
  });
}
