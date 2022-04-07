class AppBasedDriver {
    getOrientation() {
        if(this.state.width<this.state.height) {
            return ('portrait')
        } else {
            return('landscape')
        }
    }
}
export default AppBasedDriver;