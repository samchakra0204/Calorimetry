import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { AccountSetting01Icon, AnalyticsUpIcon, Home03Icon, SteakIcon } from '@hugeicons/core-free-icons';
import Colors from './../../shared/colors';
import { HeaderShownContext } from '@react-navigation/elements';
import { DollarSign } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: Colors.PRIMARY,
            headerShown: false
        }}>
            <Tabs.Screen name='home' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={Home03Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />
            <Tabs.Screen name='meals' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={SteakIcon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />
            <Tabs.Screen name='progress' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={AnalyticsUpIcon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />
            <Tabs.Screen name='profile' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={AccountSetting01Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />
            <Tabs.Screen
                name="billing" // 👈 Add your billing route screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <DollarSign color={color} size={size} strokeWidth={1.5} />
                    ),
                }}
            />
        </Tabs>
    )
}