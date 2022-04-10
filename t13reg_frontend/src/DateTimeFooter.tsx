import React, { useState, useContext, useMemo, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function DateTimeFooter(props:any)
{
    const now = new Date();

    return <p>
             Datum: { now.toLocaleDateString() } - 
             Tid: { now.toLocaleTimeString() }
         </p>;
}

export default DateTimeFooter;
