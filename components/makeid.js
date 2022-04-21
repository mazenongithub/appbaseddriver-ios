import AppBasedDriver from './appbaseddriver'
import { makeID } from './functions';
class MakeID {

    shiftid() {
        const appbaseddriver = new AppBasedDriver();
        let shiftid = false;
        const myuser = appbaseddriver.getuser.call(this)
        if(myuser) {
            while(!shiftid) {
                shiftid = makeID(16)
                if(myuser.hasOwnProperty("driver")) {
                    if(myuser.driver.hasOwnProperty("shifts")) {
                          // eslint-disable-next-line
                        myuser.driver.shifts.map(shift=> {
                            if(shift.shiftid === shiftid) {
                                shiftid = false;
                            }
                        })
                    }
                }
            }
        }
        return shiftid;

    }

    costid(equipmentid) {
        const appbaseddriver = new AppBasedDriver();
        let costid = false;
        while (!costid) {
        costid = makeID(16)
        const myequipment = appbaseddriver.getequipmentbyid.call(this,equipmentid)
        if(myequipment) {
            if(myequipment.hasOwnProperty("costs")) {
                // eslint-disable-next-line
                myequipment.costs.map(cost=> {
                    if(cost.costid === costid) {
                        costid = false;
                    }
                })
            }
        }

    }
    return costid;

    }
    
    equipmentid() {
    const appbaseddriver = new AppBasedDriver();
    let equipmentid = false;
    while(!equipmentid) {
        equipmentid = makeID(16)
        const equipment = appbaseddriver.getequipment.call(this)
        if(equipment) {
            // eslint-disable-next-line
            equipment.map(myequipment=> {
                if(myequipment.equipmentid === equipmentid) {
                    equipmentid = false;
                }
            })
        }
    }
    return equipmentid;
    }


}
export default MakeID