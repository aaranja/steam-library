import {StyleSheet} from "react-native";

export const game_style = StyleSheet.create({
    card: {
        margin: 10,
        padding: 20,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.26,
        borderRadius: 3,
        backgroundColor: "white",
    },
    thumbnail: {
        alignSelf: "center",
        width: "100%",
        height:  140,
    },
    description_title:{
        fontWeight:"bold",
        textAlign:"center",
        marginLeft: 10,
        marginRight: 10,
        color:"#e8e8e8"
    },
    description_text:{
        paddingTop: 10,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#e8e8e8'
    }
});

export const html_styles = StyleSheet.create({
    a: {
        fontWeight: '300',
        color: '#ff3366', // make links coloured pink
    },
    div:{
        width: '96%',
        alignSelf: 'center',
        color: '#cfd3ce',
    }

});
