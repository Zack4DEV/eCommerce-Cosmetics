import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Store from './store';
import Feedback from './screens/feedback';
import AIHelper from './AIHelper';
import Explore from './Explore';
import Profile from './Profile';
import { COLORS } from './constants/theme';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
        tabBarIcon: ({ color, size }) => {
          const icons = {
            explore: 'explore',
            store: 'store',
            ai_helper: 'assistant',
            feedback: 'feedback',
            profile: 'person',
          };
          return (
            <MaterialIcons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="store" options={{ title: 'Store' }} />
      <Tabs.Screen name="ai_helper" options={{ title: 'AI Helper' }} />
      <Tabs.Screen name="feedback" options={{ title: 'Feedback' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
