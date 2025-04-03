
import homeIcon from "../../assets/images/home.png";
import homeActiveIcon from "../../assets/images/homeActive.png";
import cartIcon from "../../assets/images/cart.png";
import cartActiveIcon from "../../assets/images/cartActive.png";

import Constants from "./constants";
import DangKyMonHoc from "../../page/dangki";
import ThoiKhoaBieu from "../../page/tkb";
import ProfileScreen from "../../page/profile";

export const publishNavigator = [

]

export const bottomNavigator = [
    {
        component: DangKyMonHoc,
        name: Constants.Navigator.HomeScreen.value,
        unFocused: homeIcon,
        focused: homeActiveIcon
    },
    {
        component: ThoiKhoaBieu,
        name: Constants.Navigator.BookingScreen.value,
        unFocused: cartIcon,
        focused: cartActiveIcon
    },
    {
        component: ProfileScreen,
        name: Constants.Navigator.InfoUserScreen.value,
        unFocused: cartIcon,
        focused: cartActiveIcon
    },
]
