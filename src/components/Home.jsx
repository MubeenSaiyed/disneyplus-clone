import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import db from "../firebase";
import { setMovies, setRecommend } from "../features/movie/movieSlice";

import { selectUserName, selectUserId } from "../features/user/userSlice";

function Home() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  let recommends = [];
  let newDisneys = [];
  let trending = [];
  let originals = [];

  let watchlist = [];

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 25px);
  overflow-x: hidden;
  display: block;
  /* top: 72px; */
  padding: 0 calc(3.5vw + 5px);

  &::after {
    content: "";
    /* background: url("/images/home-background.png") center center no-repeat fixed; */
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
