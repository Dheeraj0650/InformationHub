import React, { useState } from "react";

export default function ImgCard(props){
    return (
        <div class="card" style={{"width": "18rem"}}>
            <img class="card-img-top" src={props.url} alt="Card image cap"/>
            <div class="card-body" style={{"min-height": "18rem"}}>
                <p class="card-text">{props.description}</p>
            </div>
        </div>)
}