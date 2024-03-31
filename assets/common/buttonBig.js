import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonBig = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 30,
    height: 70,
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    width: '90%',
    height: 'fit',
    textAlign: 'center',
  },
});

export default ButtonBig;
