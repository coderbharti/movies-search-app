import React, { useMemo, useState } from 'react';

const regex = /^[0-9]+$/g;

const Modal = ({ imdbID, onClose, confirmHandler, saveReviewIds }) => {

    const reviewGiven = useMemo(() => saveReviewIds?.find(item => item.id === imdbID), [imdbID]);

    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        watchDate: '',
        rating: ''
    });

    const changeHandler = (uid, e) => {
        setData(state => ({
            ...state,
            [uid]: e.target.value
        }));
    };

    const saveHandler = (e) => {
        e.preventDefault();

        if (data.name.trim() === "" || data.email.trim() === "" || data.mobile.trim() === "" || data.rating.trim() === "" || data.watchDate.trim() === "") {
            alert("Please fill all values");
            return;
        }

        if (regex.test(data.mobile) === false) {
            alert("Please enter valid mobile number");
            return;
        }

        if (+data.rating > 6 || +data.rating < 1) {
            alert("Please enter a valid rating");
            return;
        }
        confirmHandler({
            rating: data.rating,
            imdbID,
        });
        alert("Review Given Successfully");
    };

    return (
        <div className='modal'>
            <div className='modalBody'>

                <div className='closeBtnRow'>
                    <button onClick={onClose}>&times;</button>
                </div>

                {!!reviewGiven ? <p className='success'>You have already given a {reviewGiven?.rating} star review for this movie</p> : <form onSubmit={saveHandler}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' value={data.name} onChange={changeHandler.bind(this, "name")} required />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' value={data.email} onChange={changeHandler.bind(this, "email")} required />
                    </div>
                    <div>
                        <label htmlFor='number'>Mobile Number</label>
                        <input id='number' type='tel' value={data.mobile} onChange={changeHandler.bind(this, "mobile")} required />
                    </div>
                    <div>
                        <label htmlFor='date'>Watching Date</label>
                        <input id='date' type='date' value={data.watchDate} onChange={changeHandler.bind(this, "watchDate")} required />
                    </div>
                    <div>
                        <label htmlFor='rating'>Rating</label>
                        <input id='rating' type='number' min={1} max={5} value={data.rating} onChange={changeHandler.bind(this, "rating")} required />
                    </div>
                    <div>
                        <button className='btn'>Submit</button>
                    </div>
                </form>}

            </div>
        </div>
    );
};

export default Modal;