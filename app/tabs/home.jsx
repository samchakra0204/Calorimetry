/*import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useRouter } from 'expo-router'
import HomeHeader from './../../components/homeheader'
import TodayProgress from './../../components/todayprogress'
import GenerateRecipeCard from './../../components/generaterecipecard'
import TodaysMealPlan from './../../components/todaysmealplan'

export default function home() {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && !user?.weight) {
            router.replace('/preference')
        }
    }, [user, mounted])

    return (
        <View style={{
            padding: 20,
            paddingTop: 60,
        }}>
            <HomeHeader />
            <TodayProgress />
            <GenerateRecipeCard />
            <TodaysMealPlan />
        </View>
    )
}*/

import { View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useRouter } from 'expo-router'
import HomeHeader from './../../components/homeheader'
import TodayProgress from './../../components/todayprogress'
import GenerateRecipeCard from './../../components/generaterecipecard'
import TodaysMealPlan from './../../components/todaysmealplan'

export default function Home() {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && !user?.weight) {
            router.replace('/preference')
        }
    }, [user, mounted])

    return (
        <FlatList
            data={[]}
            renderItem={null}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
                <View style={{ padding: 20, paddingTop: 60 }}>
                    <HomeHeader />
                    <TodayProgress />
                    <GenerateRecipeCard />
                    <TodaysMealPlan />
                </View>
            }
        />
    )
}

