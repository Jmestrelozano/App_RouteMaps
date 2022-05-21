import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size={50}
        color={'black'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})