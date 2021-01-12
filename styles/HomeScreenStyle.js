import {StyleSheet} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
export const style = StyleSheet.create({
    listItemContainer: {
        marginTop: 7,
        //  marginBottom: 7,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    listDesign: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        width: '100%'
    },
    vehicleDesc: {
        marginLeft: 12,
        fontSize: 16,
        color: '#AA2328',
        fontWeight: 'bold'
    },
    text: {
        marginLeft: 12,
        fontSize: 18,
        color: Colors.black,
    },
    watchListtext: {
        marginLeft: 12,
        fontSize: 14,
        color: Colors.primary,
    },
    imageLength: {
        width: '35%'
    },
    contentLength: {
        width: '65%'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    buttonContainer: {

        flexDirection: 'row',
        padding: 2

    }, imageContainer: {
        flexDirection: 'row',
    },
    justifySpaceAround: {
        justifyContent:'space-around'
    },
    justifyEnd: {
        justifyContent:'flex-end'
    },
});
