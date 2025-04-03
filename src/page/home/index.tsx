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

const screenWidth = Dimensions.get('window').width;

const MENU_ITEMS = [
    { label: 'Dashboard', icon: require('./assets/icons/dashboard.png') },
    { label: 'Homework', icon: require('./assets/icons/homework.png') },
    { label: 'Attendance', icon: require('./assets/icons/attendance.png') },
    { label: 'Fee Details', icon: require('./assets/icons/fee.png') },
    { label: 'Examination', icon: require('./assets/icons/exam.png') },
    { label: 'Report Cards', icon: require('./assets/icons/report.png') },
    { label: 'Calendar', icon: require('./assets/icons/calendar.png') },
    { label: 'Notice Board', icon: require('./assets/icons/notice.png') },
    { label: 'Multimedia', icon: require('./assets/icons/multimedia.png') },
    { label: 'Academic Year', icon: require('./assets/icons/academic.png') },
    { label: 'Profile', icon: require('./assets/icons/profile.png') },
];

const HomeScreen = () => {
    return (
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
                        <Image source={item.icon} style={styles.menuIcon} />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Logout */}
            <TouchableOpacity style={styles.logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
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
