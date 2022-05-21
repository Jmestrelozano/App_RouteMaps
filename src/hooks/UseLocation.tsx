
import React, { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const UseLocation = () => {

    const [hasLocation, setHasLocation] = useState(false)
    const [initialPos, setInitialPos] = useState<Location>({
        latitude:0,
        longitude:0
    })
    const [userLocation, setUserLocation] = useState<Location>({
        latitude:0,
        longitude:0
    })

    const [routeLine, setRouteLine] = useState<Location[]>([])    
    
    const watchId = useRef<number>()
    const isMounted = useRef(true)

    useEffect(()=>{
        isMounted.current=true
        return() =>{
            isMounted.current=false
        }
    },[])

    useEffect(()=>{
       

       getCurrentLocation()
       .then( (locatiom)=>{
        if(!isMounted.current) return

            setInitialPos(locatiom)
            setUserLocation(locatiom)
            setRouteLine(routes => [...routes, locatiom])
            setHasLocation(true)
       })
    },[])


    const getCurrentLocation = ():Promise<Location> => {
        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    })
    
                    setHasLocation(true)
                },
                err => reject(err),
                {
                    enableHighAccuracy:true
                }
                
            );
        })
    }


    const followUserLocation = () => {
       watchId.current = Geolocation.watchPosition(
            ({coords}) => {
                if(!isMounted.current) return
               setUserLocation({
                   latitude:coords.latitude,
                   longitude:coords.longitude
               })
               setRouteLine(routes =>[...routes, {
                   latitude:coords.latitude,
                   longitude :coords.longitude
                }])
            },
            err => console.log(err),
            {
                enableHighAccuracy:true,
                distanceFilter:10
            }
            
        );
        Geolocation.clearWatch
    }


    const stopUserLocation = ( ) => {
        if(watchId.current){
            Geolocation.clearWatch(watchId.current)
        }
    }


    return{
        hasLocation,
        initialPos,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopUserLocation,
        routeLine
    }
}

