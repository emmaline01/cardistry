import React from 'react';

export const TitleBar = ()=> {
    // centering title: https://stackoverflow.com/questions/20024463/bootstrap-3-how-do-i-place-the-brand-in-the-center-of-the-navbar
    return (
        <>
            <nav className="navbar navbar-default">
                <h1 className="navbar-brand navbar-header" style={{fontSize: "xx-large"}}>Cardistry Dashboard</h1>
            </nav>
        </>
    )
}