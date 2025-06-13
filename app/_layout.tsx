import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserContext } from './../context/userContext';
import { useState } from "react";
import {RefreshDataContext} from './../context/refreshdatacontext';

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  const[user, setUser] = useState();
  const [refreshData, setRefreshData] = useState();
  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{ user, setUser }}>
      <RefreshDataContext.Provider value={{refreshData, setRefreshData}}> 
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
      </Stack>
      </RefreshDataContext.Provider> 
      </UserContext.Provider>
    </ConvexProvider>
  )
}
