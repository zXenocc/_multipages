import React from "react";
import "./Home.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <div className="home-container">
      <div className="detail-container">
        <Card style={{ width: "28rem" }}>
          <Card.Img variant="top" src="./profile.jpg" />
          <Card.Body>
            <Card.Title>Natnaran Sukluan 66032000</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="info">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, expedita, tempore, fugit voluptatem doloribus quo velit reprehenderit eligendi totam porro sapiente. Nam quibusdam aliquam laboriosam earum eligendi veniam beatae possimus!
      </div>
      </div>
    </div>
  );
}

export default Home;
