import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserInfo = async (user) => {
    try {
        const data = JSON.stringify({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: user.accessToken,
            role: user.role,
        });
        await AsyncStorage.setItem('user', data);
        console.log('write ok');
    } catch (error) {
        console.error('Lỗi khi lưu trữ dữ liệu:', error);
    }
};

const getUserInfo = async () => {
    try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
            console.log('Dữ liệu đã được lấy:', value);
            return JSON.parse(value);
        } else {
            console.log('no user data');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        return null;
    }
};

const deleteUserInfo = async () => {
    try {
        await AsyncStorage.removeItem('user');
        console.log('delete ok');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
};

export { saveUserInfo, getUserInfo, deleteUserInfo };
