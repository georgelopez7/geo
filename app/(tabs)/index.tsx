import Spacer from '@/components/spacer/spacer';
import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import Strip from '@/components/strip/strip';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4">
        <Text className="text-2xl font-bold">
          Geo
        </Text>
        <Spacer size="large" />
        <Text className="px-8 text-4xl font-bold text-center">
          Quizzes
        </Text>
        <Spacer size="small" />
        
        <Strip text="World Capitals" showIcon />

        <Spacer size="xsmall" />

        <Strip text="World Capitals" />

        <Spacer size="xsmall" />

        <Strip text="World Capitals" showIcon />

      </View>
    </SafeAreaView>
  );
}
