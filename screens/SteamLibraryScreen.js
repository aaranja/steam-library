import React, {Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableHighlight
} from "react-native";
import {steam_games} from "../const/steam-game-list";
import * as hs from "../styles/HeaderStyle";
import * as home_s from "../styles/HomeScreenStyle";
import axios from "axios";

export default class SteamLibraryScreen extends Component{
    abortController = new AbortController();
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    componentDidMount() {
        this.props.navigation.setOptions(hs.styles);
    }

    componentWillUnmount() { this.source.cancel("Cancelado"); }

    setGame = (id, name) => {
        this.props.navigation.navigate(
            'Juego Steam',
            {
                appid: id,
                name: name
            });
    }

    renderRow(data) {
        return (
            <TouchableHighlight
                key = {data.index}
                onPress={() => this.setGame(data.item.appid, data.item.name)}
            >
                <View style={home_s.style.listItemContainer}>
                    <View style={home_s.style.listDesign}>
                        <Text style={{ flex:2}}>{data.item.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render(){
        return <View style={{backgroundColor: '#2a465d'}}>
            <FlatList
                style={{paddingLeft:'2%', paddingRight:'2%'}}
            data = {steam_games}
            renderItem={ item => (this.renderRow(item)) }
            keyExtractor={(item) => item.appid.toString()}
            />
        </View>
    }
}

