import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import './App.css';
import * as RF from './RegistrationForm';
import DateTimeFooter from './DateTimeFooter';
import { instanceToInstance } from "class-transformer";
import { ErrorBoundary } from "./Utilities";

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
                const data = instanceToInstance<RF.RegPropClass>(JSON.parse(await r.json()));
                setRegProps(data);
            })
            .catch(r => alert(r))
    });

    return (
        <div className="App">
            <header>
                <h1>Välkommen till Team13!</h1>
            </header>
            <ErrorBoundary>
                <Container className="App-body">
                    <RF.RegForm data={regProps} />
                </Container>
            </ErrorBoundary>
            <footer>
                <DateTimeFooter />
            </footer>
        </div>
    );
}

export default App;
