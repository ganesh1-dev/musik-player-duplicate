/** @format */

import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Footer = () => {
  const [tracks, setTracks] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await fetch(
        "https://api.deezer.com/artist/13/top?limit=50",
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

        setTracks(songs);
      } else {
        console.log("ERROR !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AudioPlayer className="audio" src={tracks.preview} controls />
    </>
  );
};

export default Footer;
