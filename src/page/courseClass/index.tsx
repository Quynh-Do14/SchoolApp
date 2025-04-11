import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainLayout from '../../infrastructure/common/layouts/layout';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import scheduleService from '../../infrastructure/repositories/schedule/schedule.service';
import examService from '../../infrastructure/repositories/exam/exam.service';
import { convertDateOnly, convertTimeOnly, translateDayToVietnamese } from '../../infrastructure/helper/helper';
import courseClassService from '../../infrastructure/repositories/courseClass/courseClass.service';
import { useIsFocused } from '@react-navigation/native';


const CourseClassScreen = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [courseClassList, setCourseClassList] = useState<any[]>([]);

    const getCourseClassListAsync = async () => {
        try {
            await courseClassService.getCourseClass(
                {},
                setLoading,
            ).then((response) => {
                if (response) {
                    setCourseClassList(response)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCourseClassListAsync().then(() => { });
    }, []);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getCourseClassListAsync().then(() => { });
        }
    }, [isFocused]);

    return (
        <MainLayout title={'Môn học đã đăng kí'}>
            <View style={styles.container}>
                <ScrollView >
                    {courseClassList.map((item, index) => (
                        <View key={index} style={[styles.eventItem, { backgroundColor: "#FFF0F0" }]}>
                            <View>
                                <Text style={styles.eventTitle}>{item.courseName}</Text>
                                <Text style={styles.eventType}>Phòng: {item.room}</Text>
                                <Text style={styles.homeworkMeta}>Giáo viên: {item.lectureFullname}</Text>
                                <Text style={styles.homeworkMeta}>Thời gian: {convertDateOnly(item.date)} - {convertDateOnly(item.endDate)}</Text>
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
    homeworkMeta: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});

export default CourseClassScreen;
