import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import scheduleService from '../../infrastructure/repositories/schedule/schedule.service';
import LoadingFullScreen from '../../infrastructure/common/layouts/components/controls/loading';
import MainLayout from '../../infrastructure/common/layouts/layout';
import ButtonCommon from '../../infrastructure/common/layouts/components/button/button-common';
import registationService from '../../infrastructure/repositories/registation/registation.service';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const noticeBoard = [
  {
    title: 'School is going for vacation in next month',
    date: '02 March 2020',
  },
  {
    title: 'Summer Book Fair at School Campus in June',
    date: '02 March 2020',
  },
  {
    title: 'School going for vacation next month',
    date: '02 March 2020',
  },
];

const homeworkList = [
  {
    id: '1',
    subject: 'English',
    date: 'Today',
    task: 'Learn Chapter 5 with one Essay',
    done: false,
  },
  {
    id: '2',
    subject: 'Maths',
    date: 'Today',
    task: 'Exercise Trigonometry 1st topic',
    done: true,
  },
  {
    id: '3',
    subject: 'Hindi',
    date: 'Yesterday',
    task: 'Hindi writing 3 pages',
    done: false,
  },
  {
    id: '4',
    subject: 'Social Science',
    date: 'Yesterday',
    task: 'Test for History first session',
    done: false,
  },
  {
    id: '5',
    subject: 'Science',
    date: '16 March 2020',
    task: 'Learn Atoms Physics',
    done: true,
  },
  {
    id: '6',
    subject: 'English',
    date: '16 March 2020',
    task: 'English writing 3 pages',
    done: false,
  },
];


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
        {
          semester: "",
          academic_year: "",
          teacher: ""
        },
        setLoading,
      ).then((response) => {
        if (response) {
          setCourses(response.schedules)
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
      await registationService.createRegistration(
        {
          schedule_id: selectedCourses
        },
        setLoading,
      ).then(() => {
        setSelectedCourses("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout title={'Đăng Ký Môn Học'}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Notice Board</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {noticeBoard.map((item, index) => (
            <View key={index} style={styles.noticeCard}>
              <Text style={styles.noticeText}>{item.title}</Text>
              <Text style={styles.noticeDate}>{item.date}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Homework</Text>
        {homeworkList.map((item) => (
          <View key={item.id} style={styles.homeworkItem}>
            <TouchableOpacity style={item.done ? styles.checkDone : styles.checkBox}>
              {item.done && <Icon name="check" size={16} color="#fff" />}
            </TouchableOpacity>
            <View style={styles.homeworkContent}>
              <Text style={styles.homeworkText}>{item.task}</Text>
              <Text style={styles.homeworkMeta}>
                {item.subject} / {item.date}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <LoadingFullScreen loading={loading} />
    </MainLayout>

  );
};

const styles = StyleSheet.create({
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
