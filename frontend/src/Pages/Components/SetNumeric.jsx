import React from 'react'

export default function SetNumeric({ client, property, unit }) {

    function handlePropertyUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			`/api/update_${property}`,
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
			console.log(response)
		})
	}

    let min;
    let max;

    if (property === "weight") {
        min = 20;
        max = 500;
    } else if (property === "height") {
        min = 50;
        max = 280;
    }


    return (
        <form onSubmit={handlePropertyUpdate} className='property-form'>
            <label htmlFor={property}>{property.charAt(0).toUpperCase() + property.slice(1)}</label>
            <input id={property} name={property} type="number" placeholder={`${property} (${unit})`} min={min} max={max}/>
            <button type="submit" className='border'><h4>Submit</h4></button>
        </form>
    )
}
