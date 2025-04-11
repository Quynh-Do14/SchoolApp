import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainLayout from '../../infrastructure/common/layouts/layout';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import scheduleService from '../../infrastructure/repositories/schedule/schedule.service';
import examService from '../../infrastructure/repositories/exam/exam.service';
import { convertTimeOnly } from '../../infrastructure/helper/helper';
import { useIsFocused } from '@react-navigation/native';


const ExamScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [examList, setExamList] = useState<any[]>([]);

    const getExamListAsync = async () => {
        try {
            await examService.getExam(
                {},
                setLoading,
            ).then((response) => {
                if (response) {
                    setExamList(response.content)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getExamListAsync().then(() => { });
    }, []);
    
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getExamListAsync().then(() => { });
        }
    }, [isFocused]);

    return (
        <MainLayout title={'Lịch thi'}>
            <View style={styles.container}>
                <ScrollView >
                    {examList.map((item, index) => (
                        <View key={index} style={[styles.eventItem, { backgroundColor: "#FFF0F0" }]}>
                            <View style={styles.dateBadge}>
                                <Text style={styles.dateDay}>{new Date(item.examDate).toLocaleString('default', { day: '2-digit' }).toUpperCase()}</Text>
                                <Text style={styles.dateMonth}>
                                    {new Date(item.examDate).toLocaleString('default', { month: 'short' }).toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.eventTitle}>{item.courseName}</Text>
                                <Text style={styles.eventType}>Phòng: {item.room}</Text>
                                <Text style={styles.eventType}>{convertTimeOnly(item.startTime)} - {convertTimeOnly(item.endTime)}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
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

export default ExamScreen;
