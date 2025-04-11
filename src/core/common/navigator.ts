import CourseClassScreen from '../../page/courseClass';
import DangKyMonHoc from '../../page/dangki';
import ExamScreen from '../../page/exam';
import GradeScreen from '../../page/grade';
import ProfileScreen from '../../page/profile';
import ThoiKhoaBieu from '../../page/tkb';
import Constants from './constants';

export const bottomNavigator = [
    {
        component: DangKyMonHoc,
        name: "Đăng kí môn học",
        icon: 'book-open-variant', // Đăng ký môn học
    },
    {
        component: CourseClassScreen,
        name: "Môn học đã đăng kí",
        icon: 'calendar-clock', // Lịch học
    },
    {
        component: ThoiKhoaBieu,
        name: "Thời Khóa Biểu",
        icon: 'clock-time-nine-outline', // Lịch học
    },
    {
        component: ExamScreen,
        name: "Lịch thi", // nên fix lại name tránh trùng
        icon: 'clipboard-text-outline', // Lịch thi
    },
    {
        component: GradeScreen,
        name: "Xem điểm", // nên fix lại name tránh trùng
        icon: 'book-edit-outline', // Lịch thi
    },
    {
        component: ProfileScreen,
        name: "Hồ sơ",
        icon: 'account-circle-outline', // Thông tin cá nhân
    },
];
