import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MainLayout from '../../infrastructure/common/layouts/layout'
import Ionicons from 'react-native-vector-icons/Ionicons';
import authService from '../../infrastructure/repositories/auth/auth.service';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../core/atoms/profile/profileState';
import LoadingFullScreen from '../../infrastructure/common/layouts/components/controls/loading';
import Constants from '../../core/common/constants';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const ProfileScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigateEditProfile = (value: string) => {
        navigation.navigate(value);
    }

    const dataProfile = useRecoilValue(ProfileState).data;

    const onLogOutAsync = async () => {
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigation.navigate("LoginScreen")
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => {
                    onLogOutAsync();
                },
            }
        ]);
    }

    return (
        <MainLayout title={"Trang cá nhân"}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Image source={dataProfile.image ? { uri: dataProfile.image } : require("../../assets/images/myAvatar.png")} style={styles.imgAvatar} />
                    <View>
                        <Text style={styles.userName}>{dataProfile?.name}</Text>
                        <Text style={styles.email}>{dataProfile?.email}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    {
                        Constants.InfoUser.List.map((it, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigateEditProfile(it.value)} style={styles.touchContent}>
                                    <Ionicons
                                        name={it.icon}
                                        size={12}
                                        color={"#392AAB"}
                                    />

                                    <Text style={styles.labelTouch}>{it.label}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity onPress={onLogOut} style={styles.touchContent}>
                        <Ionicons
                            name={"log-out-outline"}
                            size={12}
                            color={"#392AAB"}
                        />

                        <Text style={styles.labelTouch}>Đăng xuất</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    userName: {
        fontSize: 16,
        color: "#121212",
    },
    email: {
        fontSize: 12,
        color: "#121212",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    touchContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderBottomWidth: 1,
        borderColor: "#392AAB",
        paddingVertical: 16,
    },
    labelTouch: {
        fontSize: 14,
        color: "#392AAB",
        fontWeight: "bold",
    },
})