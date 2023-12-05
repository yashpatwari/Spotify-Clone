import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function CurrentTrack() {
  const [{ token , CurrentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (response.data !== "") {
        const { item } = response.data;
        const CurrentlyPlaying = {
          id: item.id,
          name:item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, CurrentlyPlaying });
      } 
      // else {
      //   dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      // }
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
     {CurrentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={CurrentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info">
            <h4>{CurrentlyPlaying.name}</h4>
            <h6>
              {CurrentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  );


}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6{
        color: #b3b3b3;
      }
    }
  }
`;
