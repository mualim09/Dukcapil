import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {windowWidth, fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements/dist/icons/Icon';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({navigation, route}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataBarang();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = () => {
    getData('user').then(res => {
      axios
        .post('https://zavalabs.com/dukcapil/api/menu2.php', {
          id_user: res.id,
        })
        .then(x => {
          console.log(x.data);
          setData(x.data);
        });
    });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Laporan', item)}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: colors.tertiary,
        borderBottomWidth: 5,
        borderBottomColor: colors.secondary,
        elevation: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          // padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 35,
            color: colors.white,
            fontFamily: fonts.secondary[600],
          }}>
          {item.judul}
        </Text>
        <Icon type="ionicon" name="folder-open" color={colors.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      style={{
        padding: 10,
      }}>
      <Text
        style={{
          fontSize: windowWidth / 30,
          textAlign: 'center',
          color: colors.black,
          fontFamily: fonts.secondary[600],
        }}>
        PELAYANAN PENCATATAN SIPIL
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
