import React, { useState, useEffect } from 'react';

export default function ConsumableSearch({ consumables, index }) {
    const [query, setQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [selectedConsumable, setSelectedConsumable] = useState(null);
    const [selectedForSubmit, setSelectedForSubmit] = useState(null);

    function updateQuery(e) {
        const currentQuery = e.target.value;
        setQuery(currentQuery);

        if (!currentQuery) {
            // Clear selectedConsumable and results when the search query is empty
            setSelectedConsumable(null);
            setQueryResults([]);
            return;
        }

        const currentQueryResults = consumables.filter((consumable) =>
            consumable.name.toLowerCase().includes(currentQuery.toLowerCase())
        );

        setQueryResults(currentQueryResults);
    }

    function handleCheckboxChange(consumable) {
        setSelectedForSubmit(consumable);
        setSelectedConsumable(consumable);
        setQueryResults([]);
        setQuery(consumable.name);
    }

    return (
        <>
            <input
                type="text"
                onChange={updateQuery}
                value={query}
                placeholder='Search...'
                className='search-input'
            />
            <div className='search-results'>
                {queryResults.map((consumable) => (
                    <div key={`${consumable.id}_${index}`} className='checkbox-container border'>
                        {selectedConsumable !== consumable && (
                            <>
                                <label htmlFor={`${consumable.id}_${index}`} className='consumable-label'>
                                    {consumable.name}
                                </label>
                                <input
                                    type="checkbox"
                                    name={`name_${index}`}
                                    value={consumable.name}
                                    checked={false}
                                    onChange={() => handleCheckboxChange(consumable)}
                                    id={`${consumable.id}_${index}`}
                                    className='consumable-checkbox'
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
            {selectedForSubmit && (
                <input type="hidden" name={`name_${index}`} value={selectedForSubmit.name} />
            )}
        </>
    );
}
