import React, { Component } from 'react'

class FrontPage extends Component {
componentDidMount(){
    fetch('https://api.npms.io/v2/search?q=react').then((snapshot) => alert(snapshot.val()))
}

    render() {

        return (
            <div>
                this is the front page
            </div>
        )
    }
}

export default FrontPage;