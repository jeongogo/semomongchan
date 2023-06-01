import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function CustomInput({hasMarginBottom, ...rest}, ref) {
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
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 12,
  },
});

export default React.forwardRef(CustomInput);