import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                {/**
                Routes enforces a stricter API. For example, you must use the element prop to pass a JSX element to the route, rather than the component prop.
                Routes makes it easier to work with nested routes.
                Routes doesn't stop at the first match by default if you're using nested routes; it checks the entire tree.
                 */}
                    {/* Correctly rendering the home page content */}
                    <Route path='/' element={<div>This is the home page</div>} />
                    
                    {/* Routes for joining and creating rooms */}
                    <Route path='/joisn' element={<RoomJoinPage />} />
                    <Route path='/create-room' element={<CreateRoomPage />} />
                </Routes>
            </Router>
        );
    }
}
