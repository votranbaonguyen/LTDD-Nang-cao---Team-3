import Realm, { ObjectSchema } from 'realm';

export class User extends Realm.Object {
    static schema = {
        name: 'User',
        properties: {
            _id: 'objectId',
            name: 'string',
            email: 'string',
            token: 'string',
        },
        primaryKey: '_id',
    };
}
