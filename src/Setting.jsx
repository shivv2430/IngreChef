import React from 'react'

const Setting = () => {
    return (
        <div>
            <div>
                <p>Language</p>
                <select name="language" id="language">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                </select>
            </div>
            <div>
                <p>Theme</p>
                <select name="theme" id="theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div>
                <p>Notification</p>
                <select name="notification" id="notification">
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div>
                <p>About</p>
                <select name="about" id="about">
                    <option value="version">Version 1.0.0</option>
                </select>
            </div>
            <div>
                <p>Contact</p>
                <select name="contact" id="contact">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
            </div>
        </div>
    )
}

export default Setting