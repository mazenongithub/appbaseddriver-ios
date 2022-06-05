import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AppBasedDriver from './appbaseddriver';
import Profile from './profile'
class Landing {

    landingScreen() {
        return(<View><Text>Landing</Text></View>)
    }


    showLanding() {
        const appbaseddriver = new AppBasedDriver();
        const profile = new Profile();
        const landing = new Landing();

        const myuser = appbaseddriver.getuser.call(this)
        if(myuser) {
            return(profile.showprofile.call(this))

        } else {

            return(landing.landingScreen.call(this))

        }

    

    }

}

export default Landing;