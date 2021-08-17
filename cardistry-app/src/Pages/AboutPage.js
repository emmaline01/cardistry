import React, {useState, useEffect} from 'react';

export const AboutPage = () => {
    return (
        <>
        <h3 style={{padding: "50px 0px 20px 0px"}}>Hi! Thanks for checking this web app out!</h3>
        <p>
            This was created by Emmaline as a personal project in the summer of 2021. 
            I originally just wanted to use some SQL queries on something more legitimate
            than homework assignments, then decided to learn Javascript/React along the way. 
        </p>
        <p>
            This website is for me to track the cardistry moves I've learned over the 
            past couple of years and to give me some ideas for what to keep learning.
            If I want to expand this project though perhaps accounts for different users could be 
            a future expansion.
        </p>
        <p>
            The GitHub link to this project is <a href="https://github.com/emmaline01/cardistry">here</a>, and my personal website is linked <a href="https://emmaline01.github.io/">here</a>.
        </p>
        </>
    )
}