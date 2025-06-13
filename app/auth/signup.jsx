import { View, Text, Image, Pressable, Alert } from 'react-native'
import { UserContext } from '../../context/userContext';
import { Link } from 'expo-router'
import React, { useContext, useState } from 'react'
import Input from './../../components/input.jsx'
import Button from './../../components/button.jsx'
import { auth } from '../../services/firebaseConfig.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from 'convex/react';
import {api} from '../../convex/_generated/api';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const createNewUser = useMutation(api.users.CreateNewUser)
    const {user, setUser}=useContext(UserContext);
    const onSignUp = () => {
        if (!name || !email || !password) {
            Alert.alert('Enter all Field Value')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                if(user) {
                    const result = await createNewUser({
                        name: name,
                        email: email
                    });
                    console.log(result);
                    setUser(result);
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
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
            }}>Create New Account</Text>
            <View style={{
                marginTop: 20,
                width: '100%'
            }}>
                <Input placeholder="Full Name" value={name} onChangeText={setName} />
                <Input placeholder="Email" value={email} onChangeText={setEmail} />
                <Input placeholder="Password" password={true} value={password} onChangeText={setPassword} />
            </View>
            <View style={{
                marginTop: 15,
                width: '100%'
            }}>
                <Button title={'Sign Up'} onPress={() => onSignUp()} />
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: 15
                }}>Already have Account?</Text>
                <Link href={'/auth/signin'}><Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: 5,
                    fontWeight: 'bold'
                }}>Sign In</Text></Link>
            </View>
        </View>
    )
}