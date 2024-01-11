import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const FetchBedrijfEdit = () => {
    const {id} = useParams();
    const [currentBedrijf, setCurrentBedrijf] = useState([]);
    const [currentError, setCurrentError] = useState([]);

    const fetcher = (id) => {
        fetch(`https://localhost:7101/api/portaal/admin/experts/${id}`, {
            method: "GET",
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                setCurrentBedrijf([data]);
            })
            .catch((error) => setCurrentError([error]));
    }

    useEffect(() => {
        fetcher(id);
        }, [id]);


        return (
            <div>
                <div className='row'> 
                    {currentError ? ( currentBedrijf.map(expert => (
                        <div key={expert.id} className="card col-lg-12 col-md-12 col-12">
                            <div className="card-body">
                                <h5 className="card-title">{expert.firstName} {expert.lastName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">User-id: {expert.id}</h6>
                                <p className="card-text">{expert.firstName} {expert.firstName} {expert.firstName} </p>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p>Kan geen Ervarings deskundige vinden met dit id</p>
                    )}
                </div>
                <div>
                    <Link to='/admin/bedrijven' className="card-link">Terug naar overzicht</Link>
                </div>
            </div>
            
            
        );
    };
    
export default FetchBedrijfEdit;