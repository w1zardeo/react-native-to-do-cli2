import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Checkmark } from './Checkmark';

const Checkbox = ({ checked, onChange, label, isDarkMode }) => (
  <TouchableOpacity onPress={onChange} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, { backgroundColor: isDarkMode ? '#2B2D37' : '#FCFCFC' }, { borderColor: isDarkMode ? '#0E0E11' : '#DADADA' }]}>
      {checked && <Checkmark isDarkMode={isDarkMode} />}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0E0E11',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#2B2D37',
    marginLeft: 18,
    marginTop: 3
  },
  label: {
    color: 'white',
    marginTop: 18,
    marginLeft: 0
  },
});

export default Checkbox;
