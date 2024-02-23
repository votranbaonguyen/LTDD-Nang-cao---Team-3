import Realm from 'realm';
import { User } from '../../models/userSchema';

const realm = new Realm({ schema: [User] });

const saveUserInfo = (user) => {
    const currentUser = realm.objects('User')[0];
    if (!currentUser) {
        realm.write(() => {
            realm.create('User', {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.accessToken,
            });
        });
    } else {
        currentUser._id = user._id;
        currentUser.name = user.name;
        currentUser.email = user.email;
        currentUser.token = user.accessToken;
    }
};

const getUserInfo = () => {
    const user = realm.objects('User')[0];
    return user ? user : null;
};

const deleteUserInfo = () => {
    const user = realm.objects('User')[0];
    if (user) realm.delete(user);
};

export { saveUserInfo, getUserInfo, deleteUserInfo };
