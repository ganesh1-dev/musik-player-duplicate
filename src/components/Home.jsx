/** @format */

import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AlbumCard from "./AlbumCard";
import Footer from "./Footer";

const Home = () => {
  const [music, setMusic] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchMusic = async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(
          "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query,
          {
            headers: {
              "X-RapidAPI-Key":
                "85f7b0f089msh4f95fec2293b7cep1ac28fjsn78f6f1885c53",
              "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          const songs = result.data;
          console.log(songs);

          setMusic(songs);
        } else {
          console.log("ERROR !!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Col className="col-12 mt-3 mainPage">
        <Row>
          <Col md={4} className="align-center">
            <Footer />
          </Col>
          <Col md={8}>
            <div id="searchResults">
              <input
                type="text"
                className="form-control mb-2"
                id="searchField"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm "
                  type="button"
                  id="button-addon1"
                  onClick={() => fetchMusic(searchQuery)}>
                  Search
                </button>
              </div>

              <h2 className="text-center mt-4">Search Results</h2>
              <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {music &&
                  music.map((song) => <AlbumCard song={song} key={song.id} />)}
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Home;
