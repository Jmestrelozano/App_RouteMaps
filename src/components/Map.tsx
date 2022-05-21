import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { UseLocation } from '../hooks/UseLocation'
import { LoadingScreen } from '../pages/LoadingScreen'
import { Fab } from './Fab'

interface MapProps{
    markers?:Marker[]
}

export const Map = ({markers}:MapProps) => {

  const [showPolyline, setShowPolyline] = useState(true)
    
    const {
      hasLocation,
      initialPos:{
        latitude,
        longitude
      },
      userLocation,
      routeLine,
      stopUserLocation,
      getCurrentLocation,
      followUserLocation,
      
    }  = UseLocation()

    const mapViewRef = useRef<MapView>()
    const followMe = useRef<boolean>(true)
    useEffect(()=>{
      followUserLocation()
      return () => {
        stopUserLocation()
      }
    },[])

    useEffect(()=>{
      if(!followMe.current) return

      const {latitude,longitude} = userLocation
      mapViewRef.current?.animateCamera({
        center:{
          latitude,
          longitude
        }
      })
    },[userLocation])

    const centerPosition = async() => {
      const {latitude,longitude} = await getCurrentLocation()
      followMe.current = true
      mapViewRef.current?.animateCamera({
        center:{
          latitude,
          longitude
        }
      })
    }

    if(!hasLocation){
        return <LoadingScreen />
    }

  return (
    <>
      <MapView
          ref={(el)=> mapViewRef.current= el!}
          style={{flex:1}}
          // showsUserLocation
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={()=>{
            followMe.current = false
          }}
        >

           {
             showPolyline && (
                <Polyline
                  coordinates={routeLine}
                  strokeColor='black'
                  strokeWidth={3}
              />
             )
           }
   
          <Marker
            coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
            }}
            title={'marker.title'}
            description={'marker.description'}
        />  

        </MapView>


        <Fab iconName='compass-outline' 
            onPress={()=>centerPosition()}
            style={{
                position:'absolute',
                bottom:20,
                right:20
            }}
        />

        <Fab iconName='brush-outline' 
            onPress={()=>setShowPolyline(!showPolyline)}
            style={{
                position:'absolute',
                bottom:80,
                right:20
            }}
        />
    </>
  )
}

const styles = StyleSheet.create({})