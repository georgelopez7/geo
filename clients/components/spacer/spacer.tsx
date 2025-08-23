import React from 'react'
import { cn } from '@/utils/utils';
import { View } from 'react-native';

const spaceSizes: Record<string, string> = {
    "xxsmall": "my-1",
    "xsmall": "my-2",
    "small": "my-4",
    "medium": "my-8",
    "large": "my-12",
    "xlarge": "my-24",
    "xxlarge": "my-36",
}

interface ISpacerProps {
    size: keyof typeof spaceSizes;
}

const Spacer = ({ size }: ISpacerProps) => {
  return (
    <View className={cn(spaceSizes[size])} />
  )
}

export default Spacer