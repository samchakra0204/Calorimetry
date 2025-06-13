import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { CheckCircle } from 'lucide-react-native';
import Colors from '../../shared/colors'; // Adjust path if needed

export default function Billing() {
  const proFeatures = [
    "Unlimited AI-generated meal plans",
    "Personalized nutrition goals",
    "Calorie & macro tracking",
    "Export meal plans as PDF",
    "Early access to new features",
  ];

  const handleSubscribe = () => {
    // Add payment gateway or upgrade logic here
    alert('Pro Subscription coming soon!');
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>Go Pro</Text>
      <Text style={{ fontSize: 16, color: '#555', marginBottom: 20 }}>
        Unlock premium features and take your health to the next level.
      </Text>

      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 15,
          marginBottom: 30,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        {proFeatures.map((feature, index) => (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
          >
            <CheckCircle color={Colors.PRIMARY || 'green'} size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleSubscribe}
        style={{
          backgroundColor: Colors.PRIMARY || '#4CAF50',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          Subscribe for ₹299/month
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
