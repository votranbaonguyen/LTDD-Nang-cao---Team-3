import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/Home';

const Tab = createBottomTabNavigator();

const BottomNavigate = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}

export default BottomNavigate