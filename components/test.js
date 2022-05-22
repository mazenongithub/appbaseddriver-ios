Alert.alert(
    'Remove Shift',
    `Are you sure you want to delete shift ${inputUTCStringForLaborID(shift.timein)} to ${inputUTCStringForLaborID(shift.timeout)} ?`,
    [
        { text: 'Cancel', onPress: () => console.log('Cancel '), style: 'cancel' },
        { text: 'OK', onPress: () => { driver.confirmremoveshift.call(this,shiftid) } },
    ],
    { cancelable: false }
)
                       

                       


