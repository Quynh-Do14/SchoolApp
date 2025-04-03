import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import authService from '../../repositories/auth/auth.service';
import { ProfileState } from '../../../core/atoms/profile/profileState';

const { width: viewportWidth } = Dimensions.get('window');

const MainLayout = ({ onGoBack, isBackButton = false, title, bgImg, ...props }: any) => {
    const [token, setToken] = useState<string>('');
    const [dataProfile, setDataProfile] = useRecoilState(ProfileState);

    const getTokenStoraged = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    };

    useEffect(() => {
        getTokenStoraged();
    }, []);

    const getProfileUser = async () => {
        if (token) {
            try {
                const response = await authService.profile(() => { });
                if (response) {                    
                    setDataProfile({ data: response });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (token) {
            getProfileUser();
        }
    }, [token]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/bgHeader.png')}
                style={styles.headerContainer}
                resizeMode="cover"
            >
                <View>
                    <Text style={styles.greeting}>Good Morning 👋</Text>
                    <Text style={styles.name}>
                        {dataProfile?.data?.name || 'Guest'}
                    </Text>
                </View>
                <Image
                    source={
                        dataProfile?.data?.image
                            ? { uri: dataProfile.data.image }
                            : require('../../../assets/images/myAvatar.png')
                    }
                    style={styles.avatar}
                />
            </ImageBackground>

            <ScrollView contentContainerStyle={styles.content}>
                {props.children}
            </ScrollView>
        </View>
    );
};

export default MainLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'space-between',
    },
    greeting: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 4,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eee',
    },
    content: {
        padding: 20,
        flex: 1
    },
});
