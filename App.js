import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useRef } from 'react';
import { Text, TextInput } from 'react-native';
import { BackHandler } from 'react-native';

export default function App() {

  const webview = useRef(null);
  const onAndroidBackPress = () => {
    if (webview.current) {
      webview.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    
    // Android 하드웨어 뒤로 가기 버튼 처리를 위한 이벤트 리스너 추가
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    // 언마운트 시 해당 이벤트 리스너 제거
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []);

  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.onlinememo.kr' }}
      ref={webview}
      textZoom={100}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
