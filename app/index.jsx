/*import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import Colors from '../shared/colors.jsx';
import Button from '../components/button.jsx';
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext.js";
import { auth } from './../services/firebaseConfig.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api.js";

export default function Index() {
  const router=useRouter();
  const {user, setUser} = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(userInfo) => {
    console.log(userInfo?.email);
    const userData=await convex.query(api.users.GetUser, {
          email: userInfo?.email
    })
    console.log(userData)
    setUser(userData)
    router.replace('/tabs/home')
  })
    return ()=>unsubscribe();
  }, [])

  return (
    <View
      style={{
        flex: 1,
      }}
    >

      <Image source={require('./../assets/images/landing.jpg')}
       style={{
        width: '100%',
        height: Dimensions.get('screen').height
       }}
      />

       <View style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        backgroundColor: '#0707075e',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 20
       }}>
        <Image source={require('./../assets/images/logo.png')}
        style={{
          width: 150,
          height: 150,
          marginTop: 150
        }}
        />
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: Colors.WHITE
        }}>AI Diet Planner</Text>
        <Text style={{
          textAlign: 'center',
          marginHorizontal: 20,
          fontSize: 20,
          color: Colors.WHITE,
          marginTop: 15,
          opacity: 0.7
        }}>Craft Delicious, Healthy, Mind Blowing Meals each day</Text>
       </View>
       <View style={{
        position:'absolute',
        width: '100%',
        bottom: 25,
        padding: 20
       }}>
        <Button title="Get Started" onPress={() => router.push('/auth/signin')} />
       </View>
    </View>
  );
}*/

import { Dimensions, Image, Text, View } from "react-native";
import Colors from '../shared/colors.jsx';
import Button from '../components/button.jsx';
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/userContext.js";
import { auth } from './../services/firebaseConfig.jsx';
import { onAuthStateChanged } from "firebase/auth";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api.js";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      if (userInfo?.email) {
        const userData = await convex.query(api.users.GetUser, {
          email: userInfo.email
        });

        if (userData) {
          setUser(userData);
          router.replace('/tabs/home')
        } else {
          setUser(null);
          router.replace('/auth/signin');
        }
      } else {
        setUser(null);
        router.replace('/auth/signin');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./../assets/images/landing.jpg')}
        style={{
          width: '100%',
          height: Dimensions.get('screen').height
        }}
      />

      <View
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
          backgroundColor: '#0707075e',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Image
          source={require('./../assets/images/logo.png')}
          style={{
            width: 150,
            height: 150,
            marginTop: 150
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: Colors.WHITE
          }}
        >
          AI Diet Planner
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 15,
            opacity: 0.7
          }}
        >
          Craft Delicious, Healthy, Mind Blowing Meals each day
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 25,
          padding: 20
        }}
      >
        <Button
          title="Get Started"
          onPress={() => {
            if (user) {
              router.replace('/tabs/home');
            } else {
              router.replace('/auth/signin');
            }
          }}
        />
      </View>
    </View>
  );
}
