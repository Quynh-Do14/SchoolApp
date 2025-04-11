import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MainLayout from '../../infrastructure/common/layouts/layout';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import timeTableService from '../../infrastructure/repositories/timeTable/timeTable.service';
import { convertDateOnly, getStartAndEndOfWeek, getVietnameseDayOfWeek } from '../../infrastructure/helper/helper';


const ThoiKhoaBieu = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [timeTable, setTimeTable] = useState<any[]>([]);
    const [timeTableNewArr, setTimeTableNewArr] = useState<any[]>([]);

    const getTimeTableAsync = async () => {
        const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
        try {
            await timeTableService.getTimeTable(
                {
                    startDate: convertDateOnly(startOfWeek, true),
                    endDate: convertDateOnly(endOfWeek, true),

                },
                setLoading,
            ).then((response) => {
                if (response) {
                    setTimeTable(response)
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTimeTableAsync().then(() => { });
    }, []);

    useEffect(() => {
        if (timeTable.length) {
            const groupedByDay = timeTable.reduce((acc, item) => {
                const day = item.dayOfWeekId || null;
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(item);
                return acc;
            }, {});
            const groupedArray = Object.entries(groupedByDay).map(([dayName, items]) => ({
                dayName,
                schedules: items
            }));
            setTimeTableNewArr(groupedArray)
        }
    }, [timeTable])
    return (
        <MainLayout title={'Thời Khóa Biểu'}>
            <View style={styles.container}>
                <ScrollView >
                    {timeTableNewArr.map((item, index) => (
                        <View key={index}>
                            <Text>{getVietnameseDayOfWeek(Number(item.dayName))} </Text>
                            {
                                item?.schedules?.map((course: any, courseIndex: number) => {
                                    return (
                                        <View key={courseIndex} style={[styles.eventItem, { backgroundColor: "#FFF0F0" }]}>
                                            <View>
                                                <Text style={styles.eventTitle}>{course.courseName}</Text>
                                                <Text style={styles.eventType}>Phòng: {course.room} / {course.startTime} - {course.endTime}</Text>
                                                <Text style={styles.eventType}>Giáo viên: {course.fullName}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
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

export default ThoiKhoaBieu;
