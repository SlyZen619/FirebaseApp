import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin tên người dùng, email và mật khẩu');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        email: userCredential.user.email,
        createdAt: new Date(),
      });

      Alert.alert('Đăng ký thành công!', `Chào mừng bạn, ${username}`);
      navigation.navigate('Đăng nhập'); // Điều hướng tới tên tiếng Việt
      
    } catch (error) {
      Alert.alert('Đăng ký thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.enhancedInput]}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e4d5f0',
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
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3edeae', // Màu nền nút
    padding: 10,
    borderRadius: 5, // Độ bo cong
    alignItems: 'center', // Căn giữa văn bản trong nút

  },
  buttonText: {
    color: '#fff', // Màu chữ trên nút
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default SignupScreen;
