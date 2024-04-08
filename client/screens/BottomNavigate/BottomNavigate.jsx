import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import { Text } from 'react-native';
import { FontAwesome, Entypo,Ionicons  } from '@expo/vector-icons';
import User from '../User/User';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import AllNotification from '../AllNotification/AllNotification';

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
                component={WeekCalendar}
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
                name='Notification'
                component={AllNotification}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
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
