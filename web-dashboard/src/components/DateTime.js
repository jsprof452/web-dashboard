import React from "react";

function DateTime()
{

  const day = new Date().getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date())

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date())

    return(


        <div className="date-time">

        <h1>
          {time}
        </h1>
        <p>{days[day]}, {date}</p>

        </div>


    )
}


export default DateTime