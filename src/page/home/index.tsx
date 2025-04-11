import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import MainLayout from '../../infrastructure/common/layouts/layout';

const screenWidth = Dimensions.get('window').width;

const MENU_ITEMS = [
    { label: 'Dashboard', icon: '' },
    { label: 'Homework', icon: '' },
    { label: 'Attendance', icon: '' },
    { label: 'Fee Details', icon: '' },
    { label: 'Examination', icon: '' },
    { label: 'Report Cards', icon: '' },
    { label: 'Calendar', icon: '' },
    { label: 'Notice Board', icon: '' },
    { label: 'Multimedia', icon: '' },
    { label: 'Academic Year', icon: '' },
    { label: 'Profile', icon: '' },
];

const HomeScreen = () => {
    return (
        <MainLayout title={"Trang cá nhân"}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                        style={styles.avatar}
                    />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>Yogita Shaje</Text>
                        <Text style={styles.class}>Class VII B</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton}>
                        <Text style={{ fontSize: 24, color: '#fff' }}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu */}
                <FlatList
                    data={MENU_ITEMS}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.menuGrid}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.menuItem}>
                            {/* <Image source={item.icon} style={styles.menuIcon} /> */}
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Logout */}
                <TouchableOpacity style={styles.logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
};

const ITEM_SIZE = screenWidth / 3 - 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B2BAE', // tím giống ảnh
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerInfo: {
        marginLeft: 12,
        flex: 1,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    class: {
        color: '#ccc',
        fontSize: 12,
    },
    closeButton: {
        padding: 4,
    },
    menuGrid: {
        paddingHorizontal: 12,
    },
    menuItem: {
        width: ITEM_SIZE,
        alignItems: 'center',
        marginVertical: 12,
    },
    menuIcon: {
        width: 48,
        height: 48,
        marginBottom: 8,
    },
    menuLabel: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    },
    logout: {
        alignItems: 'center',
        marginTop: 12,
    },
    logoutText: {
        color: '#FF6464',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default HomeScreen;
