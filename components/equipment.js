import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import MakeID from './makeid';
import { getUTCDate } from './functions'

class Equipment {

    handleequipment(value) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const makeid = new MakeID();
        if (myuser) {

            const newEquipment = (equipmentid, equipment) => {
                const repayment = { purchasedate: getUTCDate(), purchase: 0, salvagedate: getUTCDate(), salvage: 0, apr: 0 }
                return ({ equipmentid, equipment, repayment })
            }

            if (this.state.activeequipmentid) {

                const activeequipment = appbaseddriver.getequipmentbyid.call(this, this.state.activeequipmentid)
                if (activeequipment) {
                    const i = appbaseddriver.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                    myuser.equipment[i].equipment = value;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }

            } else {
                const equipmentid = makeid.equipmentid.call(this)

                const myequipment = newEquipment(equipmentid, value)
                const getequipment = appbaseddriver.getequipment.call(this)
                if (getequipment) {

                    myuser.equipment.push(myequipment)
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: equipmentid })

                } else {
                    myuser.equipment = [myequipment]
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }
    }
    getequipment() {
        const appbaseddriver = new AppBasedDriver();
        let equipment = "";
        if (this.state.activeequipmentid) {

            const myequipment = appbaseddriver.getequipmentbyid.call(this, this.state.activeequipmentid)

            equipment = myequipment.equipment;

        }
        return equipment;

    }



    showequipmentids() {
        const equipment = new Equipment();
        const appbaseddriver = new AppBasedDriver();
        let ids = [];
        const equipments = appbaseddriver.getequipment.call(this)
        if (equipments) {
            // eslint-disable-next-line
            equipments.map(myequipment => {
                ids.push(equipment.showequipmentid.call(this, myequipment))

            })
        }


        return ids;
    }

    makeequipmentactive(equipmentid) {
        if (this.state.activeequipmentid === equipmentid) {
            this.setState({ activeequipmentid: false })

        } else {
            this.setState({ activeequipmentid: equipmentid })
        }

    }
    removeequipment(myequipment) {

        const equipment = new Equipment();
        Alert.alert(
            'Remove Equipment',
            `Are you sure you want to remove ${myequipment.equipment}?`,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Equipment '), style: 'cancel' },
                { text: 'OK', onPress: () => { equipment.confirmremoveequipment.call(this,myequipment) } },
            ],
            { cancelable: false }
        )

    }


    confirmremoveequipment(equipment) {
            const appbaseddriver = new AppBasedDriver();
            const myuser = appbaseddriver.getuser.call(this)
            if (myuser) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipment.equipmentid)
                myuser.equipment.splice(i, 1)
                this.props.reduxUser(myuser)
                this.setState({ activeequipmentid: false })

            }
  
    }



    showequipmentid(myequipment) {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const equipment = new Equipment()

        const activebackground = () => {
            if (this.state.activeequipmentid === myequipment.equipmentid) {
                return (styles.activeBackground)
            }
        }
        const myuser = appbaseddriver.getuser.call(this)
        const removeIcon = appbaseddriver.getremoveicon.call(this)
        const buttonwidth = () => {

            if (this.state.width > 1200) {
                return ({ width: 55 })
            } else if (this.state.width > 600) {
                return ({ width: 45 })
            } else {
                return ({ width: 35 })
            }


        }
        if (myuser) {
            return (
                <View style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myequipment.equipmentid}

                >
                    <View style={{ ...styles.flex1 }}>
                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <Text
                                onPress={() => { equipment.makeequipmentactive.call(this, myequipment.equipmentid) }}
                                style={{ ...regularFont, ...styles.generalFont, ...activebackground() }}>{myequipment.equipment}</Text>
                        </View>

                        <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                            <Text
                                style={{ ...regularFont, ...styles.generalFont, ...styles.generalLink }}
                                onPress={() => {
                                            this.props.reduxNavigation({ navigation: 'viewequipment', equipmentid:myequipment.equipmentid })
                                            this.setState({ render: 'render' })
                                        }}
                                >
                                Go to {myequipment.equipment}</Text>

                            <Text style={{ ...styles.generalButton, ...removeIcon, ...styles.marginLeft30 }}
                                onPress={() => { equipment.removeequipment.call(this, myequipment) }}>X</Text>

                        </View>
                    </View>
                </View>
            )

        }

    }



    showequipment() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const equipment = new Equipment();

        if (myuser) {

            return (
                <View style={{ ...styles.generalFlex }}>
                    <View style={{ ...styles.flex1 }}>

                        <View style={{ ...styles.generalFlex }}>
                            <View style={{ ...styles.flex1 }}>


                                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>Create Equipment</Text>
                                </View>

                                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <TextInput style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={equipment.getequipment.call(this)}
                                        onChangeText={text => { equipment.handleequipment.call(this, text) }}
                                    />
                                </View>

                                {equipment.showequipmentids.call(this)}

                                {appbaseddriver.showsavedriver.call(this)}




                            </View>
                        </View>

                    </View>
                </View>
            )

        } else {

            <View style={{ ...styles.generalFlex }}>
                <View style={{ ...styles.flex1 }}>
                    <Text style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Equipment</Text>
                </View>
            </View>

        }
    }
}
export default Equipment;