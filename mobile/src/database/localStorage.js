/* eslint-disable no-empty */
import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorage {
  static async getItem(key) {
    try {
      const respose = await AsyncStorage.getItem(key);
      return JSON.parse(respose);
    } catch (error) {
      return null;
    }
  }

  static async setItem(key, data) {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      return null;
    }
  }

  static removeItem(key) {
    try {
      AsyncStorage.removeItem(key);
    } catch (error) {}
  }

  static async setToken(key, data) {
    try {
      return AsyncStorage.setItem(key, data);
    } catch (error) {
      return null;
    }
  }

  static async getToken(key) {
    try {
      const respose = await AsyncStorage.getItem(key);
      return respose;
    } catch (error) {
      return null;
    }
  }

  static removeToken(key) {
    try {
      AsyncStorage.removeItem(key);
    } catch (error) {}
  }
}
