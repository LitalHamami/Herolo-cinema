import React, {Component} from 'react';
import Auxiliary from '../Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/index';

class Layout extends Component{
  state={showSideDrawer: false}

  sideDrawerToggleHandler = () => {
    this.setState({showSideDrawer: !this.state.showSideDrawer})}

  render(){
    return(<Auxiliary><Toolbar open={this.sideDrawerToggleHandler}></Toolbar></Auxiliary>)}}


export default Layout;