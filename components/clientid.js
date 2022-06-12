import React from 'react';
import { View, Text} from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import * as AppleAuthentication from 'expo-apple-authentication';

class ClientID {

    showappleicon(type) {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
      
            return (<AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{...styles.appleIcon}}
                onPress={() => { appbaseddriver.appleSignIn.call(this)  }}

            />)
       
    }


    showclientid() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const loginButton = appbaseddriver.getgoogleicon.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const clientid = new ClientID();


        if (!this.state.spinner && (!this.state.apple && !this.state.google)) {
            return (
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>



                        <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {clientid.showappleicon.call(this)}
                            </View>
                     
                        </View>

                    </View>

                </View>)

        } else if (this.state.google || this.state.apple) {
            let client = "";
            if (this.state.google) {
                client = 'google'
            } else if (this.state.apple) {
                client = ' apple'
            }

            return (<View style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <Text style={{ ...styles.generalFont, ...regularFont }}>
                    Your Client is {client}

                </Text>

            </View>)


        } else if (this.state.spinner) {
            return (<Text>...</Text>)
        }
    }

}
export default ClientID;