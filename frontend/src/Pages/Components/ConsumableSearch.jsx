import React, { useState, useEffect } from 'react';

export default function ConsumableSearch({ consumables, index }) {
    const [query, setQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [selectedConsumable, setSelectedConsumable] = useState(null);

    function updateQuery(e) {
        const currentQuery = e.target.value;
        setQuery(currentQuery);
        setQueryResults([]);

        if (!currentQuery) {
            return;
        }

        const currentQueryResults = consumables.filter((consumable) =>
            consumable.name.toLowerCase().includes(currentQuery.toLowerCase())
        );

        setQueryResults(currentQueryResults);
    }

    function handleCheckboxChange(consumable) {
        setSelectedConsumable(consumable);
        setQueryResults([consumable]);
    }

    return (
        <>
            <input type="text" onChange={updateQuery} value={query} placeholder='search...'/>
            <div className='search-results'>
                {queryResults.map((consumable) => (
                    <div key={`${consumable.id}_${index}`}>
                        <label htmlFor={consumable.id}>{consumable.name}</label>
                        <input
                            type="checkbox"
                            name={`name_${index}`}
                            value={consumable.name}
                            checked={selectedConsumable === consumable}
                            onChange={() => handleCheckboxChange(consumable)}
                            id={`${consumable.id}_${index}`}
                            className='consumableCheckbox'
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
