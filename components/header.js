
import React from 'react'
import { View, Text } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';

class Header {





    showheader() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver()
        const myuser = appbaseddriver.getuser.call(this)
        const orientation = appbaseddriver.getOrientation.call(this)

        const showsubheader = (myuser) => {
            const mynav = appbaseddriver.getNavigation.call(this)

            const styles = MyStylesheet();
            let equipmentid = ``;
            let subheader = [];
            if (mynav) {
                if (myuser) {
                    switch (mynav.navigation) {
                        case 'driver':
                            subheader.push(
                                <View style={{
                                    ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,
                                    ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin
                                }} key={`subheader-2`}>
                                    <Text
                                        onPress={() => {
                                            this.props.reduxNavigation({ navigation: 'driver' })
                                            this.setState({ render: 'render' })
                                        }}
                                        style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/driver</Text>
                                </View>
                            )
                            break
                        case 'equipment':
                            subheader.push(
                                <View style={{
                                    ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,
                                    ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin
                                }} key={`subheader-2`}>
                                    <Text
                                        onPress={() => {
                                            this.props.reduxNavigation({ navigation: 'equipment' })
                                            this.setState({ render: 'render' })
                                        }}
                                        style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/equipment</Text>
                                </View>
                            )
                            break;
                        case 'viewequipment':
                           
                            equipmentid = appbaseddriver.getEquipmentID.call(this);
                          
                            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
                            if (equipment) {

                                subheader.push(
                                    <View style={{
                                        ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,
                                        ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin
                                    }} key={`subheader-2`}>
                                        <Text
                                            onPress={() => {
                                                this.props.reduxNavigation({ navigation: 'equipment' })
                                                this.setState({ render: 'render' })
                                            }}
                                            style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/equipment</Text>
                                    </View>
                                )

                                subheader.push(

                                    <View style={{
                                        ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter,
                                        ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin
                                    }}
                                    key={`subheader-3`}>
                                        <Text
                                            onPress={() => {
                                                this.props.reduxNavigation({ navigation: 'viewequipment', equipmentid })
                                                this.setState({ render: 'render' })
                                            }}
                                            style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/{equipment.equipment}</Text>
                                    </View>

                                )

                            }
                            break;

                        case 'profile':
                            subheader.push(

                                <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }} key={`subheader-2`}>
                                    <Text
                                        onPress={() => {
                                            this.props.reduxNavigation({ navigation: 'profile' })
                                            this.setState({ render: 'render' })
                                        }}
                                        style={{
                                            ...styles.boldFont, ...styles.font24, ...styles.menuColor

                                        }}>/{myuser.driverid}</Text>
                                </View>
                            )
                            break;

                        default:
                            break;

                    }
                }

            }
            return subheader;
        }


        const loginlink = (myuser) => {
            if (myuser) {
                return (
                    <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }}>

                        <Text
                            style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}
                            onPress={() => appbaseddriver.logoutuser.call(this)}>
                            Logout
                        </Text>
                    </View>
                )

            } else {
                return (
                    <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }}>
                        <Text style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}
                            onPress={() => {
                                this.props.reduxNavigation({ navigation: 'login' })
                                this.setState({ render: 'render' })
                            }}
                        >Access</Text>
                    </View>)

            }

        }

        const equipmentlink = (myuser) => {

            if (myuser) {
                return (
                    <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }}>
                        <Text onPress={() => {
                            this.props.reduxNavigation({ navigation: 'equipment' })
                            this.setState({ render: 'render' })
                        }}
                            style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/equipment</Text>

                    </View>)

            }

        }

        const showdriver = (myuser) => {
            if (myuser) {
                return (
                    <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }}>
                        <Text onPress={() => {
                            this.props.reduxNavigation({ navigation: 'driver' })
                            this.setState({ render: 'render' })
                        }}
                            style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/driver</Text>
                    </View>)

            }
        }

        const homelink = (myuser) => {
            if (myuser) {
                return (
                    <View style={{ ...styles.menuBackColor, ...styles.radius5, ...styles.padding5, ...styles.addMargin, ...styles.alignCenter }}>
                        <Text onPress={() => {
                            this.props.reduxNavigation({ navigation: 'profile' })
                            this.setState({ render: 'render' })
                        }} style={{ ...styles.boldFont, ...styles.font24, ...styles.menuColor }}>/{myuser.driverid}</Text>
                    </View>)
            }
        }






        const menu = (myuser) => {

            if (orientation === 'portrait') {

                return (
                    <View style={{ ...styles.generalContainer }}>

                        <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {homelink(myuser)}

                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {equipmentlink(myuser)}
                            </View>

                        </View>
                        <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>

                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {showdriver(myuser)}

                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {loginlink(myuser)}

                            </View>
                        </View>


                        <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {showsubheader(myuser)}
                            </View>
                        </View>

                    </View>

                )

            } else {

                return (
                    <View style={{ ...styles.generalContainer }}>

                        <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {homelink(myuser)}
                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>

                                {equipmentlink(myuser)}
                            </View>

                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {showdriver(myuser)}
                            </View>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {loginlink(myuser)}
                            </View>
                        </View>

                        <View style={{ ...styles.generalFlex, ...styles.padding5, ...styles.bottomMargin10 }}>
                            <View style={{ ...styles.flex1, ...styles.alignCenter }}>
                                {showsubheader(myuser)}
                            </View>
                        </View>

                    </View>

                )

            }


        }
        return (

            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>



                    {menu(myuser)}




                </View>

            </View>)
    }
}

export default Header;