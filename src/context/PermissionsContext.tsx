import React, { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";

export interface PermissionsState {
    locationStatus: PermissionStatus
}

export const permissionsInitState: PermissionsState ={
    locationStatus:'unavailable'
}

type PermissionsContextProps ={
    permissions:PermissionsState,
    askLocationPermissions: () => void,
    checkLocationPermissions: () => void
}

export const PermissionsContext = createContext({} as PermissionsContextProps)


export const PermissionProvider = ({children}:any) => {

    const [permissions,setPermissions] = useState(permissionsInitState)

    useEffect(()=>{

        checkLocationPermissions()
        
        AppState.addEventListener('change',state=>{
            if(state !== 'active') return

            checkLocationPermissions()
        })

        
    },[])

    const askLocationPermissions = async() =>{
        let permissionsStatus: PermissionStatus

        if(Platform.OS === 'ios'){
          permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        }else{
          permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          
        }

        if(permissionsStatus === 'blocked'){
            openSettings();
        }

        setPermissions({...permissions,
            locationStatus:permissionsStatus
        })
    }

    const checkLocationPermissions = async() => {
        let permissionsStatus: PermissionStatus

        if(Platform.OS === 'ios'){
          permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        }else{
          permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          
        }

        setPermissions({...permissions,
            locationStatus:permissionsStatus
        })
    }

    return(
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermissions,
            checkLocationPermissions
        }}>
            {children}
        </PermissionsContext.Provider>
    )

}