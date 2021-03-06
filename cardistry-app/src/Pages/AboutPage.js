import React from 'react';

/* displays information about the web app
 */
export const AboutPage = () => {
    return (
        <>
        <h4 style={{padding: "50px 0px 20px 0px"}}>Hi! Thanks for checking this web app out!</h4>
        <p>
            This was created by Emmaline as a personal project in the summer of 2021. 
            I originally just wanted to use some SQL queries on something more legitimate
            than homework assignments, then decided to learn Javascript/React along the way.
            I also decided to add in a Markov chain to generate cardistry combo ideas and to 
            use the YouTube Data API with search terms generated from the list of 
            known cardistry moves to make more recommendations for other similar
            moves to learn, so that this dashboard could also be used while or before 
            learning new cardistry moves instead of just for after-the-fact cardistry move
            documentation purposes.
            Let me know if you have any feedback on this or if there's any specific website functionality
            that you think would be cool to see! 
        </p>
        <p>
            Cardistry combines "cards" and "artistry," and is basically card flourishing.
            It doesn't include magic tricks, but is instead a performance art involving
            manipulating playing cards to create something nice to look at.
            This website is for me to track the cardistry moves I've learned over the 
            past couple of years and to give me some ideas for what to keep learning. 
            If I want to keep growing this project perhaps accounts for different users could be 
            a future expansion.
        </p>
        <p>
            The GitHub link to this project is <a href="https://github.com/emmaline01/cardistry">here</a>, and my personal website is linked <a href="https://emmaline01.github.io/">here</a>.
        </p>
        </>
    )
}