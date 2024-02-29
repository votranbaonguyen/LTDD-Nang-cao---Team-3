import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import { Text } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import User from '../User/User';

const Tab = createBottomTabNavigator();

const BottomNavigate = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name='home' size={size} color={color} />
                    ),
                    tabBarLabel: () => {
                        return null;
                    },
                }}
            />
            <Tab.Screen
                name='Calendar'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name='calendar' size={size} color={color} />
                    ),
                    tabBarLabel: () => {
                        return null;
                    },
                }}
            />
            <Tab.Screen
                name='User'
                component={User}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={size} color={color} />
                    ),
                    tabBarLabel: () => {
                        return null;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigate;
