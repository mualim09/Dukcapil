import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Alert,
} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {MyButton, MyGap} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

export default function Account({navigation, route}) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');

  const getWa = () => {
    axios.get('https://zavalabs.com/niagabusana/api/company.php').then(res => {
      setCom(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
      getWa();
    }
  }, [isFocused]);

  const btnKeluar = () => {
    Alert.alert('SIAP DUKCAPIL BUTUR', 'Apakah Anda yakin akan keluar ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          storeData('user', null);

          navigation.replace('GetStarted');
        },
      },
    ]);
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
        x +
        '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  const MyListAccount = ({judul, isi}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          padding: 20,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {judul}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {isi}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <MyListAccount judul="Nama Lengkap" isi={user.nama_lengkap} />
        <MyListAccount judul="NIK" isi={user.nik} />
        <MyListAccount judul="E - Mail" isi={user.email} />
        <MyListAccount judul="Telepon" isi={user.telepon} />
        <MyListAccount judul="Alamat" isi={user.alamat} />
      </View>
      <View style={{padding: 10}}>
        <MyButton
          onPress={() => navigation.navigate('EditProfile', user)}
          title="Edit Profile"
          colorText={colors.white}
          iconColor={colors.white}
          warna={colors.primary}
          Icons="create-outline"
        />
        <MyGap jarak={10} />
        <MyButton
          onPress={btnKeluar}
          title="Keluar"
          colorText={colors.primary}
          borderColor={colors.primary}
          borderSize={1}
          iconColor={colors.primary}
          Icons="log-out-outline"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
