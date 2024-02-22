import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Authentication/Login";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Authentication/Register";
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import BottomNavigate from "./screens/BottomNavigate/BottomNavigate";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import OTPEnter from "./screens/Authentication/OTPEnter";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{
            headerTintColor: "#0A426E",
            headerTitle: "Forgot Password",
          }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{
            headerTintColor: "#0A426E",
            headerTitle: "OTP Enter",
          }}
          name="OTPEnter"
          component={OTPEnter}
        />
        <Stack.Screen
          name="Root"
          options={{
            headerShown: false,
          }}
          component={BottomNavigate}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
