import React from 'react';
import logo from '../assets/logo.png'; // adjust the path as needed

export default function SitemarkIcon() {
    return (
        <img
            src={logo}
            alt="SiteMark"
            style={{ height: 21, width: 50, marginRight: 8 }}
        />
    );
}
