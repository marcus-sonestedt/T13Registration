import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


const DateTimeFooter = (props: {}) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            date.setSeconds(date.getSeconds() - date.getSeconds() % 5);
            setNow(date);
        }, 5 * 1000);
    }, [])

    return <Container><Row><Col>
        Datum: {now.toLocaleDateString('sv-SE')} -
        Tid: {now.toLocaleTimeString('sv-SE')}
    </Col></Row></Container>;
}

export default DateTimeFooter;
