import React from 'react'
import { MyStylesheet } from './styles';
import AppBasedDriver from './appbaseddriver';
import { View, Text } from 'react-native'

class EquipmentUI {


    showEquipment(equipmentid) {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const equipmentui = new EquipmentUI();
  
        const equipment = appbaseddriver.getequipmentbyid.call(this, equipmentid)
        const regularFont = appbaseddriver.getRegularFont.call(this)
        if (equipment) {
            return (<View style={{ ...styles.generalContainer, ...styles.addMargin }}>
                <Text style={{ ...styles.generalText, ...regularFont }} onPress={() => equipmentui.handleEquipment.call(this, equipmentid)}> {equipmentui.getEquipmentIcon.call(this, equipmentid)}</Text>
                <Text style={{ ...regularFont, ...styles.generalFont }}>
                    {equipment.equipment}
                </Text>
            </View>)

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
        const checklist = equipmentui.checkEquipmentList.call(this, equipmentid)
        if (checklist) {
            return (`X`)
        } else {
            return (`O`)
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
        let getequipment = [];
        if (equipment) {
             // eslint-disable-next-line
            equipment.map(equipmentid => {

               
                getequipment.push(equipmentui.showEquipment.call(this, equipmentid))
            })

        }
        return getequipment;

    }

    showEquipmentUI() {
        const styles = MyStylesheet();
        const appbaseddriver = new AppBasedDriver();
        const equipmentui = new EquipmentUI();
        const regularFont = appbaseddriver.getRegularFont.call(this)
        if(this.state.activeshiftid) {
            
        return (<View style={{ ...styles.generalContainer }}>

            <View style={{ ...styles.generalContainer }}>
                <Text style={{ ...styles.generalFont, ...regularFont, ...styles.boldFont }}>
                    Equipment
                </Text>

            </View>

            {equipmentui.getEquipment.call(this)}


        </View>)

        } 
    }


}

export default EquipmentUI;