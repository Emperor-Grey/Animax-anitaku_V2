import { Tabs } from 'expo-router';
import { Book1, Discover, Home2, Profile } from 'iconsax-react-native';
import React from 'react';

import TabBar from '~/components/navigation/TabBar';

const BottomLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="Home"
        key="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Home2 size={24} variant="Broken" color={color} />
            ) : (
              <Home2 size={24} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        key="discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Discover size="24" color={color} variant="Broken" />
            ) : (
              <Discover size="24" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="MyList"
        key="my_list"
        options={{
          tabBarLabel: 'My List',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Book1 size="24" variant="Broken" color={color} />
            ) : (
              <Book1 size="24" color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        key="settings"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Profile size="24" variant="Broken" color={color} />
            ) : (
              <Profile size="24" color={color} />
            ),
        }}
      />
    </Tabs>
  );
};

export default BottomLayout;
