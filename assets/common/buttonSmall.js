import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonSmall = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0ac2ff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 50,
    width: '50%',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
    textAlign: 'center',
    color: 'white',
  },
});

export default ButtonSmall;
