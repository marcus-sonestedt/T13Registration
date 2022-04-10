import React, { ReactNode } from "react";
import { Image, Container, Row, Col, Alert } from "react-bootstrap";

interface Props 
{
    children: ReactNode;
}

// see https://reactjs.org/docs/error-boundaries.html
export class ErrorBoundary extends React.Component<Props, { hasError: boolean, error: any }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error);
        console.error(errorInfo);

        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const errStr = this.state.error == null ? '' : this.state.error.toString();

            // You can render any custom fallback UI
            return <Container>
                <Row className="justify-content-md-center">
                    <Col md='12' lg='5'>
                        <h1>Något gick snett! <span role="img" aria-label="sadface">😥</span></h1>
                        <Alert variant='danger'>{errStr}</Alert>
                    </Col>
                    <Col md='12' lg='3'>
                        <Image src='/static/brokenpiston.jpg' alt="Broken piston" fluid />
                    </Col>
                </Row>
            </Container>
        }

        return this.props.children;
    }
}
