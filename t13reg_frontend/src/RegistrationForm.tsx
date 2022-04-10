import React, { useState, useMemo } from "react";
import { Row, Form } from "react-bootstrap";
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

export const RegForm = (props: { data: RegProps }) => {
    const { data } = props;
    const [state, setState] = useState(new Models.DriverInfo());

    const lookupLicNo = (e: { target: { value: string; }; }) => setState({ ...state, lic_no: e.target.value });

    const club_options = useMemo(() => <>
        {[...data.clubs.entries()].map((kv) =>
            <option value={kv[0]}>{kv[1].name}</option>
        )}</>, [data.clubs]);

    const kart_class_options = useMemo(() => <>
        {[...data.kart_classes.entries()].map(e =>
            <option value={e[0]}>{e[1].name}</option>
        )}</>, [data.kart_classes]);

    const fee_options = useMemo(() => <>
        {[...data.fees.entries()].map(e =>
            <option value={e[0]}>{e[1].name}</option>
        )}</>, [data.fees]);

    return (
        <Form>
            <Row>
                <Form.Label>Personnummer/Licensnummer:
                    <Form.Control value={state.lic_no} onChange={lookupLicNo} />
                </Form.Label>
                <Form.Label>Namn:
                    <Form.Control value={state.full_name} onChange={e => setState({ ...state, full_name: e.target.value })} />
                </Form.Label>
                <Form.Label>Kön:
                    <Form.Select value={state.full_name} onChange={e => setState({ ...state, gender: e.target.value })}>
                        {gender_options}
                    </Form.Select>
                </Form.Label>
            </Row>
            <Row>
                <Form.Label>Klubb:
                    <Form.Select value={state.club_id} onChange={e => setState({ ...state, club_id: Number.parseInt(e.target.value) })}>
                        {club_options}
                    </Form.Select>
                </Form.Label>
                <Form.Label>Avgift:
                    <Form.Select value={state.fee_id} onChange={e => setState({ ...state, fee_id: Number.parseInt(e.target.value) })}>
                        {fee_options}
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
            </Row>
            <Row>   
                <Form.Control type="submit">Registrera</Form.Control>
                <Form.Control type="input" onClick={e => ''}></Form.Control>
            </Row>
        </Form>);
}
