export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Signup = "/signup"
        static Profile = "user/profile"
        static UpdateProfile = "/profile/update"
        static ChangePassword = "/profile/change-password"
    }
    static Course = class {
        static course = "/courses"
    }
    static Schedule = class {
        static schedule = "/schedules"
    }
    static Registration = class {
        static registration = "/registration"
    }
    static TimeTable = class {
        static timeTable = "/timetable"
    }
};