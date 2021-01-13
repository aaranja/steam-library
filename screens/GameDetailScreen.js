import React, { Component, Fragment } from "react";
import {
    Image,
    Text,
    View,
    SafeAreaView,
    ScrollView
} from "react-native";
import axios from "axios";
import HTMLView from "react-native-htmlview";
import * as style from "../styles/SteamLibraryStyle";
import GameImage from "../components/GameImage";

export default class GameDetailScreen extends Component{
    abortController = new AbortController();
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    constructor(props) {
        super(props);
        this.state = {
            loading: true,      // Datos del juego cargando
            game_data: null,    // Datos del juego
        }
    }
    /* Función que consigue los datos del juego con un id  */
    fetchData = async (id) => {
        const url = "https://store.steampowered.com/api/appdetails?appids=" + id;
        try{
            let result = await axios.get(url, {cancelToken: this.source.token});
            return result.data;
        } catch (error){
            if(axios.isCancel(error)){
                console.log("petición cancelada", error.message);
                throw new Error("Cancelled");
            }
        }
    };
    /* Poner nombre del juego en la cabecera de la vista
    * y axios.get para conseguir los datos del juego */
    componentDidMount() {
        this.props.navigation.setOptions({
            title: this.props.route.params.name,
            headerStyle: {
                backgroundColor: '#171a21',
            },
            headerTintColor: '#e8e8e8',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
        /* Conseguir datos del juego*/
        this.fetchData(this.props.route.params.appid).then(response =>{
                this.setState({
                    loading: false,
                    game_data:response[this.props.route.params.appid].data,
                })
            }).catch(err =>{ console.log("Petición cancelada"); });
    }
    /* Cancelar la petición de descarga del juego */
    componentWillUnmount() {
        this.source.cancel("Operación cancelada por el usuario");
    }

    /* Renderizar ciertos nodos con propiedades especiales */
    renderNode = (node, index, siblings, parent, defaultRenderer) =>{
        if (node.name === 'h2' || node.name === 'h1') {
            const a = node.attribs;
            var text = node.children[0].data;
            return(<Text key={index} style={style.game_style.description_title}>{"\n\n"}{text}{"\n"}</Text>);
        } else {
            if (node.name === 'img'){
                const a = node.attribs;
                return <GameImage style={style.game_style.image_descriptor} key={index} source = {a.src}/>
            }
        }
    }

    render(){
        let img_url = null;
        let description;
        if(!this.state.loading && this.state.game_data!== undefined){
            if(this.state.game_data.header_image!== undefined){img_url = this.state.game_data.header_image;}
            if(this.state.game_data.detailed_description === undefined){
                description = `<div> ${this.state.game_data.short_description}</div>`;
            }else {description = `<div> ${this.state.game_data.detailed_description}</div>`;}
        }
        return (
            <View style={{backgroundColor: '#1b364a', flex:1, paddingBottom:'5%'}}>
                {!this.state.loading ?
                    <SafeAreaView>
                        <ScrollView>
                            <Fragment>
                                {img_url!== null ? <Image style={style.game_style.thumbnail}
                                                          source = {{uri:img_url}}/> : null }
                                <Text style={style.game_style.description_text}>Descripción</Text>
                                <HTMLView
                                    value={description}
                                    stylesheet={style.html_styles}
                                    renderNode={this.renderNode}
                                />
                            </Fragment>
                        </ScrollView>
                    </SafeAreaView>
                    :
                    <Text>Cargando</Text>}
            </View>
        );
    }
}
