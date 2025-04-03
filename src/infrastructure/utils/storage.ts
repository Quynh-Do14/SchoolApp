import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearToken = async () => {
  await AsyncStorage.removeItem("token");
};
export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export const isTokenStoraged = async () => {
  const token = await AsyncStorage.getItem("token").then(result => {
    return result
  });
  console.log("token", token);

  return !!token;
};

export const getTokenStoraged = async () => {
  const token = await AsyncStorage.getItem("token").then(result => {
    return result
  });
  return token;
};

export const saveToken = async (token: any) => {
  await AsyncStorage.setItem("token", token);
};

export const getStorage = async (data: any) => {
  const storage = await AsyncStorage.getItem(data).then(result => {
    return result
  });
  return storage;
};

export const setStorage = async (key: any, value: any) => {
  return await AsyncStorage.setItem(key, value);
};
