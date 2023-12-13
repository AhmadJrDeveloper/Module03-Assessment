import React from 'react'
import {Route, Routes} from 'react-router-dom';
import DisplayArticles from './components/DisplayArticles'
import ManageArticles from './components/ManageArticle';



function AppRoutes() {
  return (
        <Routes>
            <Route exact path = "/" element = {<DisplayArticles  />} />
            <Route exact path = "/Display Articles" element = {<DisplayArticles />} />
            <Route exact path = "/Manage Articles" element = {<ManageArticles />} />
        </Routes>
    )
}

export default AppRoutes