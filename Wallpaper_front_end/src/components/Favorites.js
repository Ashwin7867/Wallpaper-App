import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';

import { BrowserRouter as Router, Link } from 'react-router-dom';

import {connect} from 'react-redux';

class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image_array : []
        }
    }   
    render(){
        const {token, favoriteArray} = this.props;
        const img_arr = !!favoriteArray && !!favoriteArray.length && favoriteArray.map((img_obj) => {
            const {download_url, url} = img_obj;
            return (
                <div className="column">
                    <img src= {download_url} className="ui image"/>
                        <button className = "ui icon button" onPress = {() => this.handleFavoriteClick(img_obj)}>
                            <i className = "heart icon"/>Added to favorites
                        </button>
                </div>
                )
            })        
        return (
            <div>
                <div>
                    <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            <Image src = "/images/logo192.png" className = "ui image"/>
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

        </div>    
        )
    }
}

const mapStateToProps = (state) => {
    const {token} = state.loginReducer;
    const favourite_image_array = state.favoriteReducer;
    return {
        token : token,
        favoriteArray : favourite_image_array
    }
}

export default connect(mapStateToProps )(Favorites);