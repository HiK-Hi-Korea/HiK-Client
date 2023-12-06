import {GoogleLogin} from '@react-oauth/google';
import React, {useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView, { WebViewNavigation } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const WebViewBox = () => {
  const customUserAgent = 'customUserAgent';
  const webviewRef = useRef(null);
  const handleWebViewNavigationStateChange = (e: WebViewNavigation) => {
    const {url} = e;
    // if (url.includes('code/google')) {
    //   webviewRef.stopLoading();
    //   // maybe close this view?
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef.current}
        style={styles.webview}
        source={{
          uri: 'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/request/google',
        }}
        userAgent={customUserAgent}
        // sharedCookiesEnabled={true}
        // thirdPartyCookiesEnabled={true}
        // onNavigationStateChange={e => setNavState(e)}
        onNavigationStateChange={e => handleWebViewNavigationStateChange(e)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});
