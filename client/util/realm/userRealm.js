import Realm from 'realm';
import { User } from '../../models/userSchema';

const realm = new Realm({ schema: [User] });

const saveUserInfo = (user) => {
    realm.write(() => {
        realm.create(
            'User',
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.accessToken,
            },
            true
        );
    });
    console.log('write ok');
};

const getUserInfo = () => {
    console.log('read ok');

    const user = realm.objects('User')[0];
    return user ? user : null;
};

const deleteUserInfo = () => {
    try {
        realm.write(() => {
            const user = realm.objects('User')[0];
            if (user) realm.delete(user);
        });
    } catch (error) {
        console.error('Error deleting user info:', error);
    }
};

export { saveUserInfo, getUserInfo, deleteUserInfo };
