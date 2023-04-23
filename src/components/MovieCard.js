import React, { useMemo } from 'react';

const MovieCard = ({ data, openModalHandler, saveReviewIds }) => {

    const reviewGiven = useMemo(() => saveReviewIds?.find(item => item.id === data?.imdbID), [saveReviewIds]);

    return (
        <div className="card">
            <div className="loaded-image-container" onClick={openModalHandler.bind(this, data?.imdbID)}>
                <img src={data?.Poster} alt={data?.Title} />
            </div>
            <div className="loaded-card-body">
                <h2 className="card-title">
                    {data?.Title}
                </h2>
                <p className="card-intro">
                    <span>
                        <span className='subheading'>Actors</span> - {data?.Actors}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>Awards</span> - {data?.Awards}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>Director</span> - {data?.Director}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>Genre</span> - {data?.Genre}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>Revenue</span> - {data?.BoxOffice}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>Release Date</span> - {data?.Released}
                    </span>
                    <br />
                    <span>
                        <span className='subheading'>IMDB Rating</span> - {data?.imdbRating}🌟
                    </span>
                    <br />
                    {!!reviewGiven ? <span>
                        <span className='subheading'>User Rating</span> - {reviewGiven?.rating}⭐
                    </span> : null}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;