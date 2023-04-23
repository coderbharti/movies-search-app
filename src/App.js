import axios from 'axios';
import React, { useState } from 'react';
import { createPortal } from "react-dom";
import CardRow from "./components/CardRow";
import Modal from './components/Modal';
import MovieCard from './components/MovieCard';
import SkeletonRow from './components/SkeletonRow';

const App = () => {

  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState({
    isVisible: false,
    imdbID: null
  });
  const [saveReviewIds, setSaveReviewIds] = useState([]);

  const changeHandler = (e) => {
    setMovieName(e.target.value);
  };

  const searchHandler = () => {
    setLoading(true);
    setError(false);

    axios.get(`https://www.omdbapi.com/?apikey=e3ee3732&t=${movieName}*`)
      .then(res => {
        if (res.data?.Response === "False") throw new Error("Movie not found");
        setApiData(res.data);
      })
      .catch(() => {
        setApiData(null);
        setError("Unable to find movie, please try some other movie name.");
      })
      .finally(() => setLoading(false));
  };

  const openModalHandler = (imdbID) => {
    setShowModal({
      isVisible: true,
      imdbID
    });
  };

  const closeModalHandler = () => {
    setShowModal({
      isVisible: false,
      imdbID: null
    });
  };

  const confirmHandler = (data) => {
    setSaveReviewIds(state => [...state, {
      id: data.imdbID,
      rating: data.rating
    }]);
    setShowModal({
      isVisible: false,
      imdbID: null
    });
  };

  return (
    <>
      {showModal.isVisible ? createPortal(
        <Modal
          imdbID={showModal.imdbID}
          onClose={closeModalHandler}
          confirmHandler={confirmHandler}
          saveReviewIds={saveReviewIds}
        />, document.getElementById("modal")) : null}
      <div className='body'>
        <h1 className='title'>EazzyMovie</h1>
        <div className='row'>
          <input type='text' placeholder='Search Movie with ...' value={movieName} onChange={changeHandler} />
          <button className='btn' disabled={loading} onClick={searchHandler}>Search</button>
        </div>
      </div>
      {!!error ? <h3 className='error'>{error}</h3> : null}
      {loading ? <SkeletonRow /> : null}
      {!!apiData ? (<CardRow>
        <MovieCard key={apiData?.Title} data={apiData} openModalHandler={openModalHandler} saveReviewIds={saveReviewIds} />
      </CardRow>) : null}
    </>
  );
};

export default App;