import React from 'react'
import { Text, View } from 'react-native'
import { IStripProps } from './strip.interface'
import { ArrowBigRight } from 'lucide-react-native';

const Strip = ({ text, showIcon = false }: IStripProps) => {
    return (
        <View className="w-full flex-row items-center justify-between  p-2 bg-primary rounded-lg border-4 border-secondary">
            <Text className="px-2 text-lg">
                {text}
            </Text>

            {showIcon && (
                <View className="pr-2">
                    <ArrowBigRight color="black" size={24} />
                </View>
            )}
        </View>
    )
}

export default Strip