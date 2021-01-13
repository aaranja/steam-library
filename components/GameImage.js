import React, {Component} from "react";
import {Image} from "react-native";
import axios from "axios";

global.Buffer = global.Buffer || require ('buffer').Buffer

export default class GameImage extends Component{
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();

    constructor(props) {
        super(props);
        this.state = {
            img : require("../assets/loader.gif"),     /* Inicializar el estado de la carga de imagen*/
        }
    }

    componentDidMount() {
        this.fetchImg(this.props.source).then( async response => {
            /* Leer el response en formato base64*/
            const buffer = Buffer.from(response.data, 'base64');

            /* Asignar la nueva imagen descargada y re-renderizar el componente */
            this.setState({
                    img: { uri: `data:image/gif;base64,${buffer.toString('base64')}`},
                });
        }).catch(err =>{
            console.log("Petición cancelada", err.message);
        });
    }

    componentWillUnmount() {
        /* Cancelar la descarga de la imagen */
        this.source.cancel("Operación cancelada por el usuario");
    }

    /* Función que descarga la imagen del servidor en formato arraybuffer */
    fetchImg = async (url) =>{
        try{
            return await axios.get(url, {
                cancelToken: this.source.token,
                responseType: "arraybuffer"
            });
        } catch (error){
            if(axios.isCancel(error)){
                console.log("Descarga img cancelada", error.message);
                throw new Error("Cancelled img");
            }
        }
    };

    render(){
        return <Image style={{height: 160, width:308 }} source = {this.state.img} />
    }


}

