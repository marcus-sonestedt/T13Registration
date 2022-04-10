import React, { useState, useContext, useMemo, useCallback } from "react";
import { Container, Row, Col, Button, Form, FormLabel, FormText } from "react-bootstrap";

class DriverInfo {
    ss_no: string = "";
    full_name: string = ""
    gender: string = "X";
    club_id: number = 1;
    kart_class_id: number = 0;
    kart_number: number = 0;
    fee_id: number = 0;
}

class Club {
    id: number = 0;
    name: string = "";
    kcv: boolean = false;
}

class KartClass {
    id: number = 0;
    name: string = "";
    free: boolean = false;
}

class Fee {
    id: number = 0;
    name: string = "";
    amount: number = 0;
}

class RegProps {
    kart_classes: Map<number, KartClass> = new Map();
    clubs: Map<number, Club> = new Map();
    fees: Map<number, Fee> = new Map();
}

function RegistrationForm(props: RegProps) {
    const [state, setState] = useState(new DriverInfo());

    const lookupSsNo = (event: { target: { value: string; }; }): void => setState({ ...state, ss_no: event.target.value });

    const club_options = useMemo(() => <>{[...props.clubs.entries()].map((kv) =>
        <option value={kv[0]}>{kv[1].name}</option>
    )}</>, [props.clubs]);
    const kart_class_options = useMemo(() => <>{[...props.kart_classes.entries()].map(e =>
        <option value={e[0]}>{e[1].name}</option>
    )}</>, [props.kart_classes]);
    const fee_options = useMemo(() => <>{[...props.fees.entries()].map(e =>
        <option value={e[0]}>{e[1].name}</option>
    )}</>, [props.fees]);

    return
    <Form>
        <Row>
            <Form.Label>Personnummer/Licensnummer:
                <Form.Control value={state.ss_no} onChange={lookupSsNo} />
            </Form.Label>
            <Form.Label>Namn:
                <Form.Control value={state.full_name} onChange={e => setState({ ...state, full_name: e.target.value })} />
            </Form.Label>
            <Form.Label>Kön:
                <Form.Select value={state.full_name} onChange={e => setState({ ...state, gender: e.target.value })}>
                    <option value="M">Man</option>
                    <option value="F">Kvinna</option>
                    <option value="X">Ospec</option>
                </Form.Select>
            </Form.Label>
        </Row>
        <Row>
            <Form.Label>Klubb:
                <Form.Select value={state.club_id} onChange={e => setState({ ...state, club_id: Number.parseInt(e.target.value) })}>
                    {club_options}
                </Form.Select>
            </Form.Label>
        </Row>
        <Row>
            <Form.Label>Klass:
                <Form.Select value={state.kart_class_id} onChange={e => setState({ ...state, kart_class_id: Number.parseInt(e.target.value) })}>
                    {kart_class_options}
                </Form.Select>
            </Form.Label>
            <Form.Label>Nummer:
                <Form.Control value={state.kart_number} onChange={e => setState({ ...state, kart_number: Number.parseInt(e.target.value) })} />
            </Form.Label>
            <Form.Label>Avgift:
                <Form.Select value={state.fee_id} onChange={e => setState({ ...state, fee_id: Number.parseInt(e.target.value) })}>
                    {fee_options}
                </Form.Select>
            </Form.Label>
        </Row>
        <Row>
            <Form.Control type="submit">Registrera</Form.Control>
            <Form.Control type="input" onClick={}>Rensa</Form.Control>
        </Row>
    </Form>;
}

export default RegistrationForm;
