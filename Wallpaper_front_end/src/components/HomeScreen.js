import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import '../styles/homescreen.css';

import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';

import {fetchImages} from '../api/fetchImages';

import {connect} from 'react-redux';
import {add_to_favorite} from '../redux/actions/favoriteActions';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image_array : [],
            page_num: 1
        }
    }
    async componentDidMount(){
        const {token} = this.props;
        const {page_num , image_array} = this.state;
        const {page , pageCount ,docs} = await fetchImages(page_num , token);
        if(docs){
            this.setState({
                image_array : docs,
                page_num : page_num +1
                })
            }
        }
    handleImageLoadClick = async () => {
        const {token} = this.props;
        const {page_num, image_array} = this.state;
        if(page_num <=10){
            const {page , pageCount, docs} = await fetchImages(page_num , token);
            this.setState({
                page_num : page_num +1,
                image_array : [...image_array , ...docs]
            })
        }
    }

    handleFavoriteClick = (img_obj) => {
        this.props.add_to_favorite(img_obj);
    }
    tempFunction = (temp_id , fav_id_arr) => {
        if(!!fav_id_arr && !!fav_id_arr.length && fav_id_arr.indexOf(temp_id)!== -1){
            return true
        }else{
            return false
        }
    }
    render(){
        const {token ,fav_id_arr} = this.props;
        const img_arr = this.state.image_array.map((img_obj) => {
            const {download_url, url ,id} = img_obj;
            const temp_id = parseInt(id);
            const custom_button = this.tempFunction(temp_id, fav_id_arr) ? (<button className = "ui red icon button">
                            <i className = "heart icon"/>Added to favorites
                        </button>):(<button className = "ui icon button" onClick = {() => this.handleFavoriteClick(img_obj)}>
                            <i className = "heart icon"/>Add to favorites
                        </button>)
            return (
                <div className="column">
                    <img src= {download_url} className="ui image"/>
                        {custom_button}
                </div>
                )
            })        
        return (
            <div>
                <div>
                {!token && <Redirect to='/'/>}
                    <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            Wallpaper Application
                        </Menu.Item>
                        <Menu.Item as='a'><Link to = '/homescreen'>Home</Link></Menu.Item>
                        <Menu.Item as ='a'><Link to = '/favorites'>Favourites</Link></Menu.Item>
                </Container>
                </Menu>
                </div>
                <div className="ui grid">
                    <div className="ui relaxed three column grid">
                        {img_arr}
                    </div>
                </div>
                <div>
                    <button className = "ui primary button"
                        onClick = {this.handleImageLoadClick}>Load More Images</button>
                </div>

        </div>    
        )
    }
}

const mapStateToProps = (state) => {
    const {token} = state.loginReducer;
    const fav_arr = state.favoriteReducer;
    const fav_id_arr = !!fav_arr && !!fav_arr.length && fav_arr.map((fav)=> {
        const {id} = fav;
        return parseInt(id)
    })
    return {
        token : token , 
        fav_id_arr : fav_id_arr
    }
}

const mapDispatchToProps = {
    add_to_favorite
}

export default connect(mapStateToProps , mapDispatchToProps)(HomeScreen);