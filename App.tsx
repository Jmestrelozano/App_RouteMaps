import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Navigation } from './src/navigation/Navigation'
import { PermissionProvider } from './src/context/PermissionsContext'



const App = () => {
  return (
    <NavigationContainer>
      <PermissionProvider>
        <Navigation />
      </PermissionProvider>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})