import React from "react";
import { Route } from "react-router-dom";


import CollectionsOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from '../collection/collection.component';



const ShopPage = ({match}) => (
    <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
     <Route path={`${match}/:collectionId`} component={CollectionPage} />
    </div>
);
    
 

    

export default ShopPage;