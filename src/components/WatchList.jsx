import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import db from "../firebase";
import {
  setWatchlist,
  setWatchlistMovies,
} from "../features/watchlist/watchlistSlice";
import {
  selectWatchList,
  selectWatchListMovies,
} from "../features/watchlist/watchlistSlice";
import { selectUserId } from "../features/user/userSlice";

function WatchList() {
  const dispatch = useDispatch();

  const uid = useSelector(selectUserId);
  const watchlistIDs = useSelector(selectWatchList);
  const watchlistMovies = useSelector(selectWatchListMovies);
  let upComingData = [];
  let getMovieDetails = [];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(uid);

    db.collection("users")
      .doc(uid)
      .collection("watchlist")
      .get()
      .then((res) => {
        console.log(res);
        res.docs.map((doc) => {
          upComingData = [...upComingData, doc.id];
        });

        upComingData.map((wid) => {
          db.collection("movies")
            .doc(wid)
            .get()
            .then((doc) => {
              // console.log(doc.data());
              getMovieDetails = [
                ...getMovieDetails,
                { id: doc.id, ...doc.data() },
              ];
              // getMovieDetails.push(doc.data());
              dispatch(
                setWatchlistMovies({
                  watchListMovies: getMovieDetails,
                })
              );
              setIsLoading(false);
            });
        });

        dispatch(
          setWatchlist({
            watchListData: upComingData,
          })
        );
      })
      .then(() => {});
  }, [uid]);

  console.log(watchlistMovies);
  return !isLoading ? (
    <Container>
      <Heading>Watchlist</Heading>
      <Content>
        {watchlistMovies &&
          watchlistMovies.map((movie) => {
            return (
              <Wrap>
                <Link to={"/detail/" + movie.title}>
                  <img src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            );
          })}
      </Content>
    </Container>
  ) : (
    <Container>
      <Heading className="loading">Loading...</Heading>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 0 calc(3.5vw + 5px);

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    font-size: 4rem;
    letter-spacing: 0px;
    animation: anime_loading 1s ease alternate infinite;
  }

  @keyframes anime_loading {
    from {
      letter-spacing: 0;
    }
    to {
      letter-spacing: 10px;
    }
  }
`;

const Heading = styled.h1`
  margin-top: 100px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.2);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out;
    width: 100%;
    z-index: 0;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default WatchList;
