import React, { useState, useEffect, createContext, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { instanceToInstance } from "class-transformer";
import { Html5QrcodeScanner } from "html5-qrcode"

import './App.css';
import * as RF from './RegistrationForm';
import DateTimeFooter from './DateTimeFooter';
import { ErrorBoundary } from "./Utilities";
import { Html5QrcodeResult } from "html5-qrcode/esm/core";



const QrCodeScanner = (props: { onScanFound: (code: string) => void }) => {

    useEffect(() => {
        setTimeout(() => {
            function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
                // handle the scanned code as you like, for example:
                console.log(`Code matched = ${decodedText}`, decodedResult);
                if (props.onScanFound) {
                    props.onScanFound(decodedText);
                }
            }

            function onScanFailure(error: string) {
                // handle scan failure, usually better to ignore and keep scanning.
                // for example:
                if (error.indexOf("NotFoundException") < 0) {
                    console.warn(`Code scan error = ${error}`);
                }
            }

            const scanner = new Html5QrcodeScanner("scanner",
                { fps: 10, qrbox: { width: 250, height: 250 }, supportedScanTypes: [] },
                false);
            scanner.render(onScanSuccess, onScanFailure);
        }, 5000);
    });

    return <div id="scanner" />
}

const MainBody = (props: { data: RF.RegProps }) => {
    const [scanCode, setScanCode] = useState("");

    return <Container fluid>
        <Row>
            <Col md="6">
                <RF.RegForm data={props.data} scanCode={scanCode} />
            </Col>
            <Col md="2" />
            <Col md="4">
                <p>Scanner</p>
                <QrCodeScanner onScanFound={setScanCode} />
            </Col>
        </Row>
    </Container>;
}

const MainRouter = (props: { data: RF.RegProps }) =>
    <Routes>
        <Route path="/">
            <Route path="frontend">
                <Route path="main" element={<MainBody data={props.data} />} />
                <Route index element={<Navigate replace to="main" />} />
            </Route>
            <Route index element={<Navigate replace to="/frontend/main" />} />
        </Route>
    </Routes>

function App() {
    const [regProps, setRegProps] = useState(new RF.RegPropClass());

    useEffect(() => {
        fetch("/api/global_data",
            {
                //signal: controller.signal,
                cache: "no-store",
                //headers: getJsonHeaders()
            })
            .then(async r => {
                if (r.status != 200) {
                    throw r;
                }

                const data = instanceToInstance<RF.RegPropClass>(JSON.parse(await r.json()));
                setRegProps(data);
            })
            .catch(r => {
                console.log(r);
            })
    });

    return (
        <div className="App">
            <BrowserRouter>
                <header>
                    <h1>Välkommen till Team13!</h1>
                </header>
                <div className=".App-body">
                    <ErrorBoundary>
                        <MainRouter data={regProps} />
                    </ErrorBoundary>
                </div>
                <footer>
                    <DateTimeFooter />
                    <Footer />
                </footer>
            </BrowserRouter>
        </div>
    );
}

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer mt-auto">
            <Container fluid>
                <Row className="my-footer">
                    <Col lg={4} md={12}>
                        <p>
                            Copyright &copy; <a href="http://www.team13.se">Team13 GKRC</a>{' '}
                            and <a href="https://mackeblog.blogspot.com">Marcus Sonestedt</a>{' '}
                            2022-{currentYear}.
                        </p>
                    </Col>
                    <Col lg={4} md={12}>
                        <p>Hosted at <a href='https://eu.pythonanywhere.com/?affiliate_id=00000d91'>eu.pythonanywhere.com</a>.</p>
                    </Col>
                    <Col lg={4} md={12}>
                        <p>
                            Developed with <a href="https://reactjs.org">React</a> and
                            {' '}<a href="https://www.djangoproject.com">Django</a> by
                            {' '}<a href="https://github.com/marcusl">Marcus Sonestedt</a>.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default App;
