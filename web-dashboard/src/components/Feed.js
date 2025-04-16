import React from "react";
//const key = process.env.REACT_APP_API_KEY;
function Feed(props){

    
    //const apiURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=" + props.channel + "&maxResults=10&order=date&type=video&key=" + key;
    //const apiURL1 = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCatVlK-imF7H9o0RDGOYWAg&maxResults=10&order=date&q=surfing&type=video&key=";
    
    

    return(

        <div className={"feed" + props.pos}>

            Feed MEEEE
            <h2>{props.channel}</h2>
            

        </div>

    )
}


export default Feed