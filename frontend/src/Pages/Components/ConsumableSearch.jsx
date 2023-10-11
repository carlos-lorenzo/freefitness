import React, { useState, useEffect } from 'react';

export default function ConsumableSearch({ consumables, index }) {
    const [query, setQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [selectedConsumable, setSelectedConsumable] = useState(null);
    const [selectedForSubmit, setSelectedForSubmit] = useState(null);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            
            updateQuery();
            
        }, 1000);
        return () => clearTimeout(timeoutId);
      }, [query]);

    function updateQuery() {

        if (!query) {
            // Clear selectedConsumable and results when the search query is empty
            setSelectedConsumable(null);
            setQueryResults([]);
            return;
        }

        const currentQueryResults = consumables.filter((consumable) =>
            consumable.name.toLowerCase().includes(query.toLowerCase())
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
                onChange={e => setQuery(e.target.value)}
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
