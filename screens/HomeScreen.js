import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation, route }) => {
  // Lấy tên người dùng từ params
  const username = route.params?.username || 'Người dùng';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login', { reset: true }); // Chuyển hướng với thông tin reset
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Icon name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Chỉnh sửa dòng chào mừng với tên người dùng */}
      <Text style={styles.title}>Mừng bạn trở lại, {username}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7f2b8'
  },
  title: {
    fontSize: 24,
  },
  iconButton: {
    marginRight: 10,
  },
});

export default HomeScreen;
