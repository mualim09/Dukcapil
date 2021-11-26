import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {MyButton, MyGap} from '../../components';
import {colors} from '../../utils/colors';
import {color} from 'react-native-reanimated';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

export default function GetStarted({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const bottom = new Animated.Value(windowWidth);
  const opacity = new Animated.Value(0);
  const top = new Animated.Value(0);

  Animated.timing(bottom, {
    toValue: 100,
    duration: 1200,
    useNativeDriver: false,
  }).start();

  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  Animated.timing(top, {
    toValue: 50,
    duration: 1000,
    useNativeDriver: false,
  }).start();

  return (
    <SafeAreaView style={styles.page} resizeMode="cover">
      {/* <StatusBar backgroundColor={colors.secondary} barStyle="light-content" /> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            aspectRatio: 0.5,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          marginBottom: 100,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[900],
            color: colors.primary,
            fontSize: windowWidth / 4,
          }}>
          SIAP
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            color: colors.primary,
            fontSize: windowWidth / 16,
          }}>
          DUKCAPIL BUTUR
        </Text>
      </View>
      <MyButton
        title="LOGIN"
        Icons="log-in-outline"
        warna={colors.primary}
        onPress={() => navigation.navigate('Login')}
      />

      <MyGap jarak={20} />

      <MyButton
        title="REGISTER"
        iconColor={colors.primary}
        borderSize={1}
        borderColor={colors.primary}
        Icons="book-outline"
        colorText={colors.primary}
        // warna={colors.secondary}
        onPress={() => navigation.navigate('Register')}
      />

      <Animated.View style={{height: top}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 50,
    fontFamily: fonts.secondary[800],
    fontSize: 50,
    color: colors.primary,
  },
});
