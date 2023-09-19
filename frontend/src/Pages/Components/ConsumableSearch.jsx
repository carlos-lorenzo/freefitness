import React from 'react'
import { useState, useEffect } from 'react';

export default function ConsumableSearch({ consumables }) {

    const [query, setQuery] = useState("");
    const [queryResults, setQueryResulsts] = useState([]);

    function updateQuery(e) {
        let currentQuery = e.target.value
        setQuery(currentQuery);
        setQueryResulsts([]);

        if (!currentQuery) {
            return 0;
        }

        let currteQueryResults = [];

        consumables.map(consumable => {

            if (consumable.name.toLowerCase().includes(query.toLowerCase())) {
                currteQueryResults.push(consumable);
            }
        })

        setQueryResulsts(currteQueryResults);



    }

    return (
        <>
            <h1>search</h1>
            <input type="search" onChange={updateQuery} value={query} />
            <div id='search-results'>
                {queryResults.map(consumable => {
                    return (
                        <>
                            <label htmlFor={consumable.id}>{consumable.name}</label>
                            <input type="checkbox" value={consumable.name} key={consumable.id} id={consumable.id} className='consumableCheckbox' />
                        </>
                    )
                })}
            </div>
        </>
    )
}
