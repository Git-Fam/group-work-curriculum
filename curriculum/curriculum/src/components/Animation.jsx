import React from 'react';
import "./css/animation.css";
import {useEffect} from 'react';

const Animation = () => {

    useEffect(() => {
        const anime = document.getElementById("animation");
        anime.animate({
            bottom: "-20px"}, 300, "swing", anime.animate({
                bottom: "-1000px"}, 10000)
            );
    })    
    
    
  return (
    <div id='animation'>animation</div>
  )
}

export default Animation;