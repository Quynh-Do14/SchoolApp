import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { bottomNavigator } from '../../../core/common/navigator';
import Constants from '../../../core/common/constants';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <Tab.Navigator
            initialRouteName={Constants.Navigator.HomeScreen.value}
            // headerShown={false}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#0C0F14",
                    borderColor: "#0C0F14",
                },
            }}
        >
            {
                bottomNavigator.map((it, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={it.name}
                            component={it.component}
                            options={{
                                tabBarIcon: ({ focused, color, size }: any) => {
                                    if (!focused) {
                                        return <Image source={it.unFocused} />
                                    }
                                    else {
                                        return <Image source={it.focused} />
                                    }
                                },
                            }}
                        />
                    )
                })
            }

        </Tab.Navigator>
    );
}

export default BottomMenu