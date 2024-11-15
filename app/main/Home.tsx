import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  View,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ViewToken,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import AnimeBannerText from '~/components/AnimeBannerText';
import Gradient from '~/components/Gradient';
import HomeBanner from '~/components/HomeBanner';
import HomeButtons from '~/components/HomeButtons';
import { animeData } from '~/helpers/data';
import { Anime } from '~/types';

const Home = () => {
  const { width } = useWindowDimensions();
  const [anime, setAnime] = useState(animeData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const interval = useRef<NodeJS.Timeout>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0]?.index);
    }
  };

  const viewAbilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
    // onMomentumEnd: (e) => {
    // }
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % anime.length;
        setCurrentIndex(nextIndex);

        ref.current?.scrollToOffset({
          offset: Math.round(nextIndex * width),
          animated: true,
        });
      }, 4000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, currentIndex, anime.length, width]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <StatusBar
        translucent
        backgroundColor="transparent"
        animated
        hideTransitionAnimation="fade"
      />

      {/* Home Banner for the current anime */}
      {anime.map((anime: Anime, index) => {
        return (
          currentIndex === index && <HomeBanner key={anime.id} index={index} item={anime} x={x} />
        );
      })}

      <Gradient />

      {/* FlatList of Anime */}
      <View className="flex flex-col">
        <Animated.FlatList
          onScrollBeginDrag={() => {
            setIsAutoPlay(false);
          }}
          onScrollEndDrag={() => {
            setIsAutoPlay(true);
          }}
          style={{ flexGrow: 0 }}
          ref={ref}
          data={anime}
          onScroll={onScroll}
          horizontal
          viewabilityConfigCallbackPairs={viewAbilityConfigCallbackPairs.current}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(_, index) => `list_item${index}`}
          onEndReachedThreshold={0.5}
          onEndReached={() => setAnime([...anime, ...animeData])}
          renderItem={({ item, index }) => {
            return <AnimeBannerText item={item} index={index} x={x} />;
          }}
        />

        <HomeButtons />
      </View>
    </SafeAreaView>
  );
};

export default Home;
