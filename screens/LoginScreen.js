import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { auth, db } from '../firebaseConfig'; // Đảm bảo đường dẫn đúng
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin email và mật khẩu');
      return;
    }

    try {
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        Alert.alert('Lỗi', 'Tài khoản chưa được đăng ký.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        Alert.alert('Đăng nhập thành công!', `Chào mừng bạn trở lại, ${userData.username}`);
        
        setEmail('');
        setPassword('');
        navigation.navigate('Home', { username: userData.username });
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng');
      }
    } catch (error) {
      let errorMessage = 'Sai mật khẩu';
      Alert.alert('Lỗi', errorMessage);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}
    >
      <View style={styles.scrollContainer}>
        <TextInput
          style={[styles.input, styles.enhancedInput]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.enhancedInput]}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Nút chuyển đến màn hình đăng ký */}
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e3dcc5', // Thêm màu nền
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  enhancedInput: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#d95f8e',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%', // Đảm bảo nút chiếm toàn bộ chiều rộng của buttonContainer
    alignSelf: 'center'
  },
  loginButtonText: {
    color: '#fff', // Màu chữ trên nút
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  registerText: {
    color: '#1E90FF', // Màu chữ cho phần đăng ký
    fontSize: 16,
    textDecorationLine: 'underline', // Gạch chân
  },
});

export default LoginScreen;
