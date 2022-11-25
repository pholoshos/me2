import { useState, useEffect, useRef } from "react";
import { Card, Carousel, Col, Container, ListGroup, Nav, Navbar, Row } from "react-bootstrap";
import { IoIosPerson, IoMdRadioButtonOn, IoMdVolumeLow, IoMdVideocam } from "react-icons/io";
import socket from "../util/socket";


export default function Home() {

  const members = [
    { name: 'pholosho seloane' },
    { name: 'alex' }
  ]

  const videoEl = useRef<HTMLVideoElement | any>()
  const canvas = useRef<any>();

  const [mainAudio, setMainAudio] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    mainAudio.pause();
    mainAudio.currentTime = 0;
    mainAudio?.play();
    console.log("LOG::: manual play")
  }

  useEffect(() => {
    document.body.style.backgroundColor = "white"
    const username = "pholosho";
    socket.auth = { username };
    socket.connect()
    socket.connected ? console.log("connected") : console.log("not connected!")

  })


  useEffect(() => {
    socket.on("recieveAudio", (args: any) => {
      const blob = new Blob([args.audio])
      const srcBlob = URL.createObjectURL(blob);
      //const video = new Audio(srcBlob);
      videoEl.current.src = srcBlob;

      setIsPlaying(true);
      //setMainAudio(audio);

   

    })

  }, [])

  useEffect(() => {
    mainAudio?.play();
  }, [mainAudio])



  return (
    <div style={{ background: '', height: '100vh' }}>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home"><IoMdRadioButtonOn />meetU</Navbar.Brand>
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
              
                <video  autoPlay ref={videoEl}  ></video>

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
