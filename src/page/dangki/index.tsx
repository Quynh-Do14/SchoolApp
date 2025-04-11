import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import scheduleService from '../../infrastructure/repositories/schedule/schedule.service';
import MainLayout from '../../infrastructure/common/layouts/layout';
import registationService from '../../infrastructure/repositories/enrollment/enrollment.service';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import ButtonCommon from '../../infrastructure/common/components/button/button-common';
import { convertDateOnly, translateDayToVietnamese } from '../../infrastructure/helper/helper';
import { useIsFocused } from '@react-navigation/native';

const DangKyMonHoc = () => {
  const [selectedCourses, setSelectedCourses] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<any[]>([]);

  const toggleCourse = (id: string) => {
    setSelectedCourses(id)
  };

  const getAllScheduleAsync = async () => {
    try {
      await scheduleService.getSchedule(
        {},
        setLoading,
      ).then((response) => {
        if (response) {
          setCourses(response)
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllScheduleAsync().then(() => { });
  }, []);

  const handleDangKy = async () => {
    try {
      await registationService.createEnrollment(
        {
          classId: selectedCourses
        },
        setLoading,
      ).then(() => {
        setSelectedCourses("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getAllScheduleAsync().then(() => { });
    }
  }, [isFocused]);

  return (
    <MainLayout title={'Đăng Ký Môn Học'}>
      <View style={styles.container}>
        <ScrollView>
          {courses.map((item, index) => (
            <TouchableOpacity onPress={() => toggleCourse(item.courseClassId)} key={index} style={styles.homeworkItem}>
              <View style={selectedCourses == item.courseClassId ? styles.checkDone : styles.checkBox}>
                {selectedCourses == item.id && <Icon name="check" size={16} color="#fff" />}
              </View>
              <View style={styles.homeworkContent}>
                <Text style={styles.homeworkText}>{item.courseName}</Text>
                <Text style={styles.homeworkMeta}>Phòng: {item.room} /</Text>
                <Text style={styles.homeworkMeta}>Giáo viên: {item.fullName}</Text>
                <Text style={styles.homeworkMeta}>Thời gian: {convertDateOnly(item.date)} - {convertDateOnly(item.endDate)}</Text>
                <Text style={styles.homeworkMeta}>Lịch học:</Text>
                {
                  item?.dayNames?.map((day: string, dayIndex: number) => (
                    <Text style={styles.homeworkMeta} key={dayIndex}>{translateDayToVietnamese(day)} {"=>"} {item.startTime} - {item.endTime}</Text>
                  ))
                }
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ButtonCommon
          title={'Đăng kí'}
          onPress={handleDangKy} />
      </View>
      <LoadingFullScreen loading={loading} />
    </MainLayout>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#4B4B4B',
  },
  noticeCard: {
    width: 220,
    height: 100,
    backgroundColor: '#E5F8F6',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  noticeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noticeDate: {
    fontSize: 12,
    color: '#888',
  },
  homeworkItem: {
    flexDirection: 'row',
    backgroundColor: '#FCEEEE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#888',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6A6EF6',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeworkContent: {
    flex: 1,
  },
  homeworkText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B4B4B',
  },
  homeworkMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default DangKyMonHoc;
