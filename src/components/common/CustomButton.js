import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

function CustomButton({onPress, title, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View style={styles.block}>
      <Pressable
        onPress={onPress}
        style={[styles.wrapper, isPrimary && styles.primaryWrapper]}
      >
        <Text style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}>{title}</Text>
      </Pressable>
    </View>
  )
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  block: {
    marginTop: 12,
  },
  wrapper: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff4e50',
    borderRadius: 24,
  },
  primaryWrapper: {
    backgroundColor: '#ff4e50',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#ff4e50',
  },
  small: {
    height: 32,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  margin: {
    marginBottom: 12,
  },
});

export default CustomButton