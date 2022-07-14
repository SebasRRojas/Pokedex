/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab1 } from './Tab1';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();




export const Tabs = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: 'white',
            }}

            screenOptions={{
                tabBarActiveTintColor: '#ff3322',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10,
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.90) ',
                    borderWidth: 0,
                    elevation: 0,
                    height: ( Platform.OS === 'android') ? 60 : 70,
                },
                headerShown: false,
            }}

        >
            <Tab.Screen
                name="StackNavigator"
                component={Tab1}
                options={{
                    title: 'List',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="list-outline"
                            size={20}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={Tab2Screen}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="search-outline"
                            size={25}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
