import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...rest}
      placeholderTextColor='#aaa'
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#222',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: 'white'
  },
  margin: {
    marginBottom: 12,
  },
});

export default React.forwardRef(BorderedInput);