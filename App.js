import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext'; // Đảm bảo rằng AuthContext đã được tạo và dùng đúng cách
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1E90FF', // Màu nền của header
            },
            headerTintColor: '#fff', // Màu của tiêu đề và nút back
            headerTitleStyle: {
              fontWeight: 'bold', // Tùy chọn kiểu chữ cho tiêu đề
            },
            headerBackTitleVisible: false, // Ẩn chữ "Back" trên iOS
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: 'Đăng nhập' }} // Tiêu đề cho màn hình đăng nhập
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ title: 'Đăng ký' }} // Tiêu đề cho màn hình đăng ký
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Trang chủ' }} // Tiêu đề cho màn hình chính
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
