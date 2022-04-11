import React, { useState, useMemo } from "react";
import { Row, Form, Button, Col, FormGroup } from "react-bootstrap";
import luhn from "fast-luhn";
import * as Models from "./Models"

export interface RegProps {
    kart_classes: Map<number, Models.KartClass>;
    clubs: Map<number, Models.Club>;
    fees: Map<number, Models.Fee>;
}

export class RegPropClass implements RegProps {
    kart_classes: Map<number, Models.KartClass> = new Map();
    clubs: Map<number, Models.Club> = new Map();
    fees: Map<number, Models.Fee> = new Map();
}

const gender_options = <>
    <option value="M">Man</option>
    <option value="F">Kvinna</option>
    <option value="X">Ospec</option>
</>;

export const RegForm = (props: { data: RegProps, scanCode: string }) => {
    const { data } = props;
    const [state, setState] = useState(() => {
        return {...new Models.DriverInfo(), lic_no: props.scanCode};
    });
    const [isLicNoValid, setLicNoValid] = useState(false);

    const lookupLicNo = (e: { target: { value: string; }; }) => {
        let value = e.target.value;
        value = value.substring(0, 13);
        setState({ ...state, lic_no: value });
        const regex = /^(\d\d\d\d)(\d\d)(\d\d)-(\d\d\d\d)$/g;
        const result = regex.exec(value);
        if (!result) {
            setLicNoValid(false);
        } else {
            const year = Number.parseInt(result.at(1) || "");
            const month = Number.parseInt(result.at(2) || "");
            const day = Number.parseInt(result.at(3) || "");
            const checksumOk = luhn(value.substring(2).replace("-", ""));
            console.log(`${value} - ${checksumOk}`)

            setLicNoValid(year >= 1900 && year <= new Date().getFullYear()
                && month >= 1 && month <= 12
                && ((day >= 1 && day <= 31) || (day >= 61 && day <= 91))
                && checksumOk);
        }
    }

    const club_options = useMemo(() => <>
        <option value="0">Välj klubb</option>
        {[...data.clubs.entries()].map((kv) =>
            <option value={kv[0]}>{kv[1].name}</option>
        )}</>, [data.clubs]);

    const kart_class_options = useMemo(() => <>
        <option value="0">Välj klass</option>
        {[...data.kart_classes.entries()].map(e =>
            <option value={e[0]}>{e[1].name}</option>
        )}</>, [data.kart_classes]);

    const fee_options = useMemo(() => <>
        <option value="0">-</option>
        {[...data.fees.entries()].map(e =>
            <option value={e[0]}>{e[1].name}</option>
        )}</>, [data.fees]);

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="licenseNo">
                    <Form.Label>Licensnummer / Personnummer:
                    </Form.Label>
                    <Form.Control type="string" value={state.lic_no} isValid={isLicNoValid}
                        onChange={lookupLicNo} placeholder="YYYYMMDD-XXXX" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="name">
                    <Form.Label>Namn:</Form.Label>
                    <Form.Control type="string" value={state.full_name} placeholder="Förnamn Efternamn"
                        onChange={e => setState({ ...state, full_name: e.target.value })} />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="gender">
                    <Form.Label>Kön:</Form.Label>
                    <Form.Select value={state.full_name} onChange={e => setState({ ...state, gender: e.target.value })}>
                        {gender_options}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="10">
                    <Form.Label>Klubb:</Form.Label>
                    <Form.Select value={state.club_id} defaultValue="1"
                        onChange={e => setState({ ...state, club_id: Number.parseInt(e.target.value) })}
                        isValid={state.club_id > 0}>
                        {club_options}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Avgift:</Form.Label>
                    <Form.Select value={state.fee_id}
                        onChange={e => setState({ ...state, fee_id: Number.parseInt(e.target.value) })}
                        isValid={state.fee_id > 0}>
                        {fee_options}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="10">
                    <Form.Label>Klass:</Form.Label>
                    <Form.Select value={state.kart_class_id} defaultValue="0"
                        isValid={state.kart_class_id > 0}
                        onChange={e => setState({ ...state, kart_class_id: Number.parseInt(e.target.value) })}>
                        {kart_class_options}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label>Nummer:
                        <Form.Control type="number" value={state.kart_number}
                            isValid={state.kart_number >= 1 && state.kart_number <= 999}
                            onChange={e => {
                                var n = Number.parseInt(e.target.value);
                                if (e.target.value.length <= 3) {
                                    setState({ ...state, kart_number: n });
                                }
                            }} />
                    </Form.Label>
                </Form.Group>
            </Row>
            <Row>
                <Col md='10'>
                    <Button variant="primary" type="submit" >
                        Registrera
                    </Button>
                </Col>
                <Col md='2'>
                    <Button variant="outline-secondary" type="submit">
                        Avbryt
                    </Button>
                </Col>
            </Row>
        </Form >);
}
