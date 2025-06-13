import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import { BarChart2, BookOpen, Utensils, Receipt, LogOut } from 'lucide-react-native';
import { auth } from './../../services/firebaseConfig';
import { UserContext } from '../../context/userContext';
import { signOut } from 'firebase/auth';

const menuOptions = [
  { title: 'My Progress', icon: BarChart2, path: '/tabs/progress' },
  { title: 'My Recipes', icon: BookOpen, path: '/tabs/meals' },
  { title: 'Serving Plan', icon: Utensils, path: '/generate-ai-recipe' },
  { title: 'Billing', icon: Receipt, path: '/tabs/billing' },
  { title: 'Log Out', icon: LogOut, path: 'logout' },
];

export default function Profile() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const OnMenuOptionClick = (menu) => {
    if (menu.path === 'logout') {
      signOut(auth).then(() => {
        console.log('SIGNED OUT');
        setUser(null);
        router.replace('/');
      });
      return;
    }
    if (menu?.path) router.push(menu.path);
  };

  const renderItem = ({ item }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        onPress={() => OnMenuOptionClick(item)}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <IconComponent size={22} color="black" />
        <Text style={{ marginLeft: 12, fontSize: 16, color: '#333' }}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f2f2f2' }}>
      <FlatList
        data={menuOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Image
              source={require('../../assets/images/user.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 99,
                marginBottom: 15,
              }}
            />
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Profile</Text>
          </View>
        }
      />
    </View>
  );
}
