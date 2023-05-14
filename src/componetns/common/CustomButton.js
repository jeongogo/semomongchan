import React from 'react';
import { View, StyleSheet, Pressable, Text, Platform } from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme, size}) {
  const isPrimary = theme === 'primary';
  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
          size === 'small' && styles.small
        ]}
        android_ripple={{
          color: isPrimary ? '#ffffff' : '#6200ee',
        }}
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
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff4e50',
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