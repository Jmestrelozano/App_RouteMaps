import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
interface FabProps {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export const Fab = ({iconName,onPress,style={}}:FabProps) => {
  return (
    <View style={{...style as any}}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.blackButton}
      >
          <Icon
             name={iconName}
             size={35}
             color='white'
             style={{left:1}}
          />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    blackButton:{
        zIndex:2,
        height:50,
        width:50,
        backgroundColor:'black',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
    }
})