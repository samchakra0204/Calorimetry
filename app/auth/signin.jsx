/*import { View, Text, Image, Pressable, Alert } from 'react-native'
import { Link } from 'expo-router'
import React, { useContext, useState } from 'react'
import Input from './../../components/input.jsx'
import Button from './../../components/button.jsx'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useConvex } from 'convex/react'
import { UserContext } from '../../context/userContext.js'
import { auth } from '../../services/firebaseConfig.jsx'
import { api } from '../../convex/_generated/api.js'

export default function Signin() {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const {user, setUser}=useContext(UserContext);
    const convex=useConvex();
    const onSignIn=()=>{
        if(!email || !password) {
            Alert.alert('Enter all Fields Value')
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userData=await convex.query(api.users.GetUser, {
          email: email
        })
        console.log(userData);
        setUser(userData);
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert('Incorrect Credentials');
      });
    }

  return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        padding: 20
    }}>
      <Image source={require('./../../assets/images/logo.png')}
      style={{
        width: 150,
        height: 150,
        marginTop: 60
      }}
      />
      <Text style={{
        fontSize: 35,
        fontWeight: 'bold'
      }}>Welcome Back</Text>
      <View style={{
        marginTop: 20,
        width: '100%'
      }}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" password={true} value={password} onChangeText={setPassword} />
      </View>
      <View style={{
        marginTop: 15,
        width: '100%'
      }}>
        <Button title={'Sign In'} onPress={()=>onSignIn()}/>
            <Text style={{
                textAlign: 'center',
                fontSize: 16,
                marginTop: 15
            }}>Don't have an Account?</Text>
            <Link href={'/auth/signup'}><Text style={{
                textAlign: 'center',
                fontSize: 16,
                marginTop: 5,
                fontWeight: 'bold'
            }}>Create New Account</Text></Link>
      </View>
    </View>
  )
}*/

import { View, Text, Image, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import Input from './../../components/input.jsx';
import Button from './../../components/button.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useConvex } from 'convex/react';
import { UserContext } from '../../context/userContext.js';
import { auth } from '../../services/firebaseConfig.jsx';
import { api } from '../../convex/_generated/api.js';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();
  const router = useRouter();

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Enter all Fields Value');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('Firebase user:', firebaseUser.email);

      // Step 1: Try to get user from Convex
      let userData = await convex.query(api.users.GetUser, {
        email: firebaseUser.email,
      });

      // Step 2: If not found, create user in Convex
      if (!userData) {
        const createdUser = await convex.mutation(api.users.CreateNewUser, {
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'No Name',
        });
        userData = createdUser;
        console.log('Created user in Convex:', createdUser);
      } else {
        console.log('Fetched existing user from Convex:', userData);
      }

      // Step 3: Set user in context
      setUser({
  ...userData,
  _id: userData._id,
});
console.log('User set in context:', userData);



      // Step 4: Redirect to home (optional)
      router.replace('/tabs/home');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Incorrect Credentials');
    }
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Image
        source={require('./../../assets/images/logo.png')}
        style={{
          width: 150,
          height: 150,
          marginTop: 60,
        }}
      />
      <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Welcome Back</Text>
      <View style={{ marginTop: 20, width: '100%' }}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="Password"
          password={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ marginTop: 15, width: '100%' }}>
        <Button title={'Sign In'} onPress={onSignIn} />
        <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 15 }}>
          Don't have an Account?
        </Text>
        <Link href={'/auth/signup'}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginTop: 5,
              fontWeight: 'bold',
            }}
          >
            Create New Account
          </Text>
        </Link>
      </View>
    </View>
  );
}
