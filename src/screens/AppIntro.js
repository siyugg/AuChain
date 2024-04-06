import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import WalletConnectionManager from './wallet_connection/WalletConnectionManager';
import {useWallet} from './wallet_connection/walletContext';
import ButtonBig from '../../assets/common/buttonBig';
const {width: screenWidth} = Dimensions.get('window');

const IntroScreen = ({item}) => {
  const navigation = useNavigation();
  const {isConnected} = useWallet();
  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]);

  return (
    <View style={styles.slide}>
      <Image
        source={require('../../assets/image/logo.png')}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      {item.showButton && (
        <ButtonBig
          title="Get Started"
          onPress={() => navigation.navigate('ConnectWallet')}
        />
      )}
    </View>
  );
};

const introData = [
  {
    title: 'Welcome to AuChain!',
    text: 'Lets get started',
    showButton: true,
  },
];

export default function AppIntro() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        data={introData}
        renderItem={({item}) => <IntroScreen item={item} />}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveIndex(index)}
        inactiveSlideOpacity={0.5}
        inactiveSlideScale={0.9}
      />
      <Pagination
        dotsLength={introData.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
