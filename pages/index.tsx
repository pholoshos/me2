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
    document.body.style.backgroundColor = "black"
    const username = "pholosho";
    socket.auth = { username };
    socket.connect()
    socket.connected ? console.log("connected") : console.log("not connected!")

  })


  useEffect(() => {
    if(videoEl.current){
      socket.on("recieveAudio", (args: any) => {
        const blob = new Blob([args.audio])
        const srcBlob = URL.createObjectURL(blob);
        const vid = document.createElement("video");
        vid.hidden = true;
        vid.src = srcBlob;
        
  
        var ctx = canvas.current.getContext('2d');

  
  
  
        videoEl.current.src = srcBlob;
        ctx.drawImage(vid, 0, 0);
        setIsPlaying(true);
        //setMainAudio(audio);
  
        videoEl.current.addEventListener('play', () =>{
          draw(videoEl.current,ctx,700,400);
      },false);
  
      })
    }


  }, [videoEl])
  

  useEffect(() => {
    mainAudio?.play();
  }, [mainAudio])

  function draw(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);
    setTimeout(draw, 20, v, c, w, h);
  }

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
                <canvas ref={canvas} id="canvas" width="800" height="600"></canvas>
                <video hidden autoPlay ref={videoEl}  ></video>

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
