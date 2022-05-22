import React from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { MyStylesheet } from './styles'
import AppBasedDriver from './appbaseddriver'

class Recharge {




    handleTotalEnergy(value) {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("recharge")) {
                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                            myuser.equipment[i].costs[j].recharge.totalenergy = value
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }
                }

            }
        }

        

    }
    getTotalEnergy() {

        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost.hasOwnProperty("recharge")) {
                return cost.recharge.totalenergy
            }
        }

    }

    getDurationHours() {

        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost.hasOwnProperty("recharge")) {
                return cost.recharge.duration.hours
            }
        }

   

    }
    handleDurationHours(value) {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("recharge")) {
                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                            myuser.equipment[i].costs[j].recharge.duration.hours = value
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }
                }

            }
        }

    }

    getDurationMinutes() {

        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost.hasOwnProperty("recharge")) {
                return cost.recharge.duration.minutes
            }
        }

    }
    handleDurationMinutes(value) {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("recharge")) {
                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                            myuser.equipment[i].costs[j].recharge.duration.minutes = value
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }
                }

            }
        }

    }


    getDurationSeconds() {

        const appbaseddriver = new AppBasedDriver();
        const equipmentid = appbaseddriver.getEquipmentID.call(this)
        if (this.state.activecostid) {
            const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
            if (cost.hasOwnProperty("recharge")) {
                return cost.recharge.duration.seconds
            }
        }

    }
    handleDurationSeconds(value) {

        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        if (myuser) {
            const equipmentid = appbaseddriver.getEquipmentID.call(this)
            const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
            if (equipment) {
                const i = appbaseddriver.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = appbaseddriver.getequipmentcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("recharge")) {
                            const j = appbaseddriver.getequipmentcostkeybyid.call(this, equipmentid, this.state.activecostid)
                            myuser.equipment[i].costs[j].recharge.duration.seconds = value
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }
                }

            }
        }

    }

    showRecharge() {
        const styles = MyStylesheet();
        const recharge = new Recharge();
        const appbaseddriver = new AppBasedDriver();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        const equipmentid = appbaseddriver.getEquipmentID.call(this);
        const equipment = appbaseddriver.getequipmentbyid.call(this,equipmentid)
        if (equipment) {
            if (this.state.activecostid) {

                const cost = appbaseddriver.getequipmentcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                if (cost) {
                    if (cost.hasOwnProperty("recharge")) {
                        return (
                            <View style={{ ...styles.generalFlex }}>

                                <View style={{ ...styles.flex1 , ...styles.addMargin }}>
                                    <Text style={{ ...styles.generalFont, ...regularFont }}>Total Energy (kWhrs)</Text>
                                    <TextInput value={recharge.getTotalEnergy.call(this).toString()}
                                        onChangeText={text => { recharge.handleTotalEnergy.call(this, text) }}
                                        style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
                                </View>


                                <View style={{ ...styles.flex1, ...styles.addMargin  }}>

                   

                              
                               

                                        <View style={{ ...styles.generalContainer, ...styles.addMargin  }}>

                                        <Text style={{ ...styles.generalFont, ...regularFont }}>Charge Duration(Minutes)</Text>
                                            <TextInput value={recharge.getDurationMinutes.call(this).toString()}
                                                onChangeText={text => { recharge.handleDurationMinutes.call(this, text) }}
                                                style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />

                                        </View>

                                 

                              



                                </View>


                            </View>)

                    }

                }


            }

        }

    }


}
        export default Recharge;