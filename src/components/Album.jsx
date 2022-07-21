/** @format */

import React, { useEffect, useState } from "react";
import Song from "./Song";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Album = () => {
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);

  const albumId = useParams().id;

  useEffect(() => {
    fetchAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAlbum = async () => {
    try {
      const response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "85f7b0f089msh4f95fec2293b7cep1ac28fjsn78f6f1885c53",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const album = await response.json();
        setAlbum(album);
        setSongs(album.tracks.data);
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-12 mainPage">
      <Row>
        {album.cover && (
          <div className="col-md-3 pt-5 text-center" id="img-container">
            <img
              src={album.cover_medium}
              className="card-img img-fluid"
              alt="Album"
            />
            <div className="mt-4 text-center">
              <p className="album-title text-light">{album.title}</p>
            </div>
            <div className="text-center text-light">
              <p className="artist-name">
                {album.artist ? album.artist.name : ""}
              </p>
            </div>
            <div className="mt-4 text-center">
              <button id="btnPlay" className="btn btn-success" type="button">
                Play
              </button>
            </div>
          </div>
        )}
        <div className="col-md-8 p-5">
          <Row>
            <div className="col-md-10 mb-5" id="trackList">
              {songs &&
                songs.map((song) => <Song track={song} key={song.id} />)}
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default Album;
