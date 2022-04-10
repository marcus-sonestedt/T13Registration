import React, {  } from "react";

function DateTimeFooter(props:any)
{
    const now = new Date();

    return <p>
             Datum: { now.toLocaleDateString('sv-SE') } - 
             Tid: { now.toLocaleTimeString('sv-SE') }
         </p>;
}

export default DateTimeFooter;
