import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { deleteUserInfo } from '../../util/storage/userStorage';
import { useNavigation } from '@react-navigation/native';

function MenuItem({ name, icon, color, onClick }) {
    return (
        <Pressable onPress={onClick}>
            <View
                style={{
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: '#f3f2f5',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                >
                    {icon}
                </View>
                <Text style={{ marginLeft: 20, color: color ? color : 'black' }}>{name}</Text>
                <MaterialIcons
                    style={{ marginLeft: 'auto' }}
                    name='navigate-next'
                    color={color ? color : 'black'}
                    size={30}
                />
            </View>
        </Pressable>
    );
}

export default function User() {
    const navigate = useNavigation();

    const handleLogout = async () => {
        await deleteUserInfo();
        navigate.navigate('Login');
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#f3f2f5' }}>
            <View style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 70 }}>
                <View
                    style={{
                        height: 100,
                        width: 100,
                        backgroundColor: '#0a426e',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 9999,
                    }}
                >
                    <FontAwesome name='user' size={50} color='white' />
                </View>
                <Text style={{ fontSize: 25, fontWeight: '900', letterSpacing: 1, marginTop: 10 }}>
                    Bao Nguyen
                </Text>
                <Text style={{ fontWeight: '300', letterSpacing: 2 }}>
                    20110597@student.hcmute.edu.vn
                </Text>
            </View>

            <View
                style={{
                    marginTop: 40,
                    backgroundColor: 'white',
                    height: '100%',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    paddingTop: 30,
                }}
            >
                <MenuItem
                    name='Change Password'
                    icon={<FontAwesome name='lock' size={20} color='black' />}
                ></MenuItem>
                <MenuItem
                    color='red'
                    name='Logout'
                    icon={<MaterialIcons name='logout' color='rgba(255,0,0,0.6)' size={21} />}
                    onClick={handleLogout}
                ></MenuItem>
            </View>
        </View>
    );
}
