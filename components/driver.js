import React from 'react'
import { View, Text } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';


class Driver {

    showDriver() {
         const styles = MyStylesheet();
         
        return(<View style={{...styles.generalContainer}}><Text>Driver</Text></View>)
    }
}