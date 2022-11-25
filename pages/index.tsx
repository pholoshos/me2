import { Card, Carousel, Col, Container, ListGroup, Nav, Navbar, Row } from "react-bootstrap";
import { IoIosPerson,IoMdRadioButtonOn, IoMdVolumeLow, IoMdVideocam } from "react-icons/io";


export default function Home() {

  const members = [
    { name: 'pholosho seloane' },
    { name: 'alex' }
  ]
  return (
    <div style={{ background: '', height: '100vh' }}>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home"><IoMdRadioButtonOn/>meetU</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Row>
              <p>Active meeting...</p>
              <Card>
                <video controls autoPlay src="./vi.mp4" width={'100%'} ></video>
                <Card.Body>Pholosho Seloane</Card.Body>
              </Card>
            </Row>


          </Col>
          <Col >
            <p><IoIosPerson /> Participant</p>
            <ListGroup>
              {members.map(({ name }) => {
                return <ListGroup.Item> <IoMdVolumeLow color="red" /> <IoMdVideocam />  | {name}   </ListGroup.Item>
              })}

            </ListGroup>

          </Col>
        </Row>
      </Container>
    </div>
  )
}
