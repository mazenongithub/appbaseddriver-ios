import React from 'react'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import { View, Text, TouchableOpacity, Image } from 'react-native'

class EquipmentUI {


    showEquipment(equipmentid) {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const equipmentui = new EquipmentUI();

        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        if (equipment) {
            return (

                <View style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    {equipmentui.getEquipmentIcon.call(this, equipmentid)}
                    <View style={{ ...styles.generalContainer }}>
                        <Text style={{ ...regularFont }}>
                            {equipment.equipment}
                        </Text>
                    </View>

                </View>


            )

        }
    }

    checkEquipmentList(equipmentid) {
        let checklist = false;
        const appbaseddriver = new AppBasedDriver();

        if (this.state.activeshiftid) {
            const shift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
            if (shift) {
                if (shift.hasOwnProperty("equipment")) {
                    if (shift.equipment.includes(equipmentid)) {

                        checklist = true;

                    }
                }
            }

        }


        return checklist;
    }

    getEquipmentIcon(equipmentid) {
        const equipmentui = new EquipmentUI();
        const styles = MyStylesheet();
        const checklist = equipmentui.checkEquipmentList.call(this, equipmentid)
        const appbaseddriver = new AppBasedDriver();

        if (checklist) {
            return (<TouchableOpacity onPress={() => { equipmentui.handleEquipment.call(this, equipmentid) }}>
                <Image source={require('./icons/greencheck.png')}
                    style={styles.greenCheckSmall}
                    resizeMethod='scale'
                />
            </TouchableOpacity>)
        } else {
            return (<TouchableOpacity onPress={() => { equipmentui.handleEquipment.call(this, equipmentid) }}>
                <Image source={require('./icons/emptybox.png')}
                    style={styles.emptyBox}
                    resizeMethod='scale'
                />
            </TouchableOpacity>)
        }





    }

    handleEquipment(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        const myuser = appbaseddriver.getuser.call(this)
        const equipmentui = new EquipmentUI();
        if (myuser) {
            if (this.state.activeshiftid) {
                const getshift = appbaseddriver.getshiftbyid.call(this, this.state.activeshiftid)
                if (getshift) {
                    const i = appbaseddriver.getshiftkeybyid.call(this, this.state.activeshiftid)

                    const checkEquipmentList = equipmentui.checkEquipmentList.call(this, equipmentid)
                    if (checkEquipmentList) {
                        const j = getshift.equipment.indexOf(equipmentid)
                        myuser.driver.shifts[i].equipment.splice(j, 1)

                    } else {
                        if (getshift.hasOwnProperty("equipment")) {

                            myuser.driver.shifts[i].equipment.push(equipmentid)

                        } else {
                            myuser.driver.shifts[i].equipment = [equipmentid]
                        }

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }
        }
    }

    getEquipment() {
        const appbaseddriver = new AppBasedDriver();
        const equipmentui = new EquipmentUI();
        const equipment = appbaseddriver.createEquipmentList.call(this);
        const styles = MyStylesheet();
        let getequipment = [];
        if (equipment) {
            // eslint-disable-next-line
            equipment.map((equipmentid, i) => {

                if (i % 2 === 0 || i == 0) {

                    if (i < equipment.length - 1) {


                        

                        getequipment.push(
                            <View
                                key={equipmentid}
                                style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <View style={{ ...styles.flex1 }}>
                                    {equipmentui.showEquipment.call(this, equipmentid)}
                                </View>
                                <View style={{ ...styles.flex1 }}>
                                    {equipmentui.showEquipment.call(this, equipment[i + 1])}

                                </View>

                            </View>



                        )

                    } else {

                        getequipment.push(<View
                        key={equipmentid}
                        style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <View style={{ ...styles.flex1 }}>
                            {equipmentui.showEquipment.call(this, equipmentid)}
                        </View>
                        <View style={{ ...styles.flex1 }}>
                            

                        </View>

                    </View>)

                    }

                }
            })

        }
        return getequipment;

    }

    showEquipmentUI() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const equipmentui = new EquipmentUI();
        const headerFont = appbaseddriver.getHeaderFont.call(this)
        if (this.state.activeshiftid) {

            return (<View style={{ ...styles.generalContainer }}>

                <View style={{ ...styles.generalContainer }}>
                    <Text style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>
                        Equipment
                    </Text>

                </View>

                {equipmentui.getEquipment.call(this)}


            </View>)

        }
    }


}

export default EquipmentUI;