import React from 'react';

export const TitleBar = ()=> {
    // centering title: https://stackoverflow.com/questions/20024463/bootstrap-3-how-do-i-place-the-brand-in-the-center-of-the-navbar
    return (
        <>
            <nav className="navbar navbar-default">
                <a className="navbar-brand navbar-header" href="https://fontmeme.com/script-fonts/"><img src="https://fontmeme.com/permalink/210815/c95ae8c1d2bd170bcbd605f856326984.png" alt="Cardistry Dashboard" width="50%"></img></a>
                {/* <h1 className="navbar-brand navbar-header" style={{fontSize: "xx-large"}}>Cardistry Dashboard</h1> */}
            </nav>
        </>
    )
}