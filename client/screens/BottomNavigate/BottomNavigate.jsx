import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomNavigate = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: size }}>{'🏡'}</Text>
                    ),
                }}
            />
            <Tab.Screen
                name='Calendar'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: size }}>{'📅'}</Text>
                    ),
                }}
            />
            <Tab.Screen
                name='User'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: size }}>{'👤'}</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigate;
