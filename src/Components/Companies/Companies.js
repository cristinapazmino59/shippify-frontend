import { useState, useEffect } from 'react';
import { find } from '../../hooks/methods';
import s from './Companies.module.css';

const Companies = () => {
    const [ companies, setCompanies ] = useState([]);

    useEffect(() => {
        find(`/companies`)
            .then(companiesArr => {
                setCompanies(companiesArr)})
            .catch(err => console.log(err));
   }, [companies]); 

    return (
        <>
        <div className={s.container}>
        <h1 className={s.title}>
            Our companies
        </h1>
        {companies
            ? <ul>
                {companies.map((companie, index) => (
                <li>{companie.name}</li>
                ))}
               </ul>
            : <div className={s.noCompaniesMessage}>There are no companies yet</div>
            }


        </div>
    </>
    )
}

export default Companies;