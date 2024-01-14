import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const FetchBedrijfEdit = () => {
    const {id} = useParams();
    const [currentExpert, setCurrentExpert] = useState([]);

    const fetcher = (id) => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch(`https://localhost:7101/api/portaal/admin/experts/${id}`, {
            method: "GET",
            headers: {
            Authorization: `${jwtToken}`,
            },
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                setCurrentExpert([data]);
            })
            .catch((error) => console.log('Error:', error, error.response));
    }

    useEffect(() => {
        fetcher(id);
        }, [id]);


        return (
            <div className='row d-flex align-items-stretch'>
                {/* max height info page */}
                <div className='col-6 '>
                    {currentExpert.map(expert => (
                        <div key={expert.id} className="card col-lg-12 col-md-12 col-12">
                            <div className="card-body">
                                <h5 className="card-title">{expert.firstName} {expert.lastName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">User-id: {expert.id}</h6>
                                <p className="card-text">{expert.firstName} {expert.firstName} {expert.firstName} </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Laadt nieuw comonent in die alle onderzoeken ophaald van een bedrijf */}
                <div className='col-6'>
                    Lijst met Alle onderzoeken - prob een scroll nodig <br></br>
                    Mobile design ontbreekt?
                </div>
                <div className='col-12'>
                    <Link to='/admin/deskundigen' className="card-link">Terug naar overzicht</Link>
                </div>
            </div>
        );
    };
    
export default FetchBedrijfEdit;