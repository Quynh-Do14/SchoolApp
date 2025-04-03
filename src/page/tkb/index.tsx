import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import timeTableService from '../../infrastructure/repositories/timeTable/timeTable.service';
import LoadingFullScreen from '../../infrastructure/common/layouts/components/controls/loading';
import MainLayout from '../../infrastructure/common/layouts/layout';
import Icon from 'react-native-vector-icons/MaterialIcons';

const events = {
    '2020-03-01': { type: 'Holiday', title: 'National Day', color: '#FEECEC' },
    '2020-03-10': { type: 'Event', title: 'Summer Holiday Event', color: '#D6F1FF' },
    '2020-03-22': { type: 'Event', title: 'School Function', color: '#FFD6DA' },
    '2020-03-26': { type: 'Event', title: 'Dean Meeting', color: '#D6FFE8' },
    '2020-03-30': { type: 'Holiday', title: 'Carnival in the City', color: '#FFF0F0' },
};

const ThoiKhoaBieu = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timeTable, setTimeTable] = useState<any[]>([]);

    const getTimeTableAsync = async () => {
        try {
            await timeTableService.getTimeTable(
                {
                    semester: "",
                    academic_year: "",
                },
                setLoading,
            ).then((response) => {
                if (response) {
                    console.log("response", response);
                    setTimeTable(response.timetable)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTimeTableAsync().then(() => { });
    }, []);


    return (
        <MainLayout title={'Thời Khóa Biểu'}>
            <ScrollView >
                <View style={styles.eventList}>
                    {Object.entries(events).map(([date, info]) => (
                        <View key={date} style={[styles.eventItem, { backgroundColor: info.color }]}>
                            <View style={styles.dateBadge}>
                                <Text style={styles.dateDay}>{new Date(date).getDate()}</Text>
                                <Text style={styles.dateMonth}>
                                    {new Date(date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.eventTitle}>{info.title}</Text>
                                <Text style={styles.eventType}>{info.type}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    eventList: {
        marginTop: 20,
    },
    eventItem: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    dateBadge: {
        width: 50,
        height: 50,
        backgroundColor: '#FF5D8F',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    dateDay: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 20,
    },
    dateMonth: {
        fontSize: 10,
        color: '#fff',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#444',
    },
    eventType: {
        fontSize: 12,
        color: '#888',
    },
});

export default ThoiKhoaBieu;
