import React, {Component} from 'react';
import styled from 'styled-components';
import './App.css';
import Menu from './Menu';
import About from './About';
import RouteCreator from './RouteCreator';
import {Switch, Route} from "react-router-dom";

const MENU_ITEMS = [
    {name: "Create", path: "", id: "create"},
    {name: "About", path: "/about", id: "about"}
]

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Menu menuItems={MENU_ITEMS}/>
                <Switch>
                    <Route exact path={""}>
                        <RouteCreator/>
                    </Route>
                    <Route exact path={"/about"}>
                        <About/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
