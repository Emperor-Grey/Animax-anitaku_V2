import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getFormattedTitle } from '~/helpers/TextFormat';
import { hp, wp } from '~/helpers/common';
import { Anime } from '~/types';

type RowItemProps = {
  name: string;
  seeAll: boolean;
  data: Anime[];
  className?: string;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const RowItem = ({ name, seeAll = true, data, className }: RowItemProps) => {
  const renderItem = ({ item, index }: { item: Anime; index: number }) => {
    return (
      <AnimatedTouchableOpacity
        entering={FadeInDown.delay(index * 400).duration(500)}
        className="flex px-2">
        <View className="overflow-hidden rounded-2xl">
          <ImageBackground source={{ uri: item.poster }} style={styles.Image} />
        </View>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <View className={className}>
      <View className="flex flex-row items-center justify-between p-4 pt-8">
        <Text className="text-2xl font-semibold text-white">{getFormattedTitle(name)}</Text>
        {seeAll && <Text className="text-base text-lime-300">view all</Text>}
      </View>
      <FlatList
        nestedScrollEnabled
        scrollEventThrottle={0.5}
        horizontal
        data={data}
        contentContainerClassName="px-2"
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RowItem;

const styles = StyleSheet.create({
  Image: {
    width: wp(28),
    height: hp(19),
  },
});
