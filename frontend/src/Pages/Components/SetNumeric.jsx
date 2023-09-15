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


    return (
        <form onSubmit={handlePropertyUpdate} className='property-form'>
            <label htmlFor={property}>{property.charAt(0).toUpperCase() + property.slice(1)}</label>
            <input id={property} name={property} type="number" placeholder={`${property} (${unit})`}/>
            <button type="submit" className='border'><h4>Submit</h4></button>
        </form>
    )
}
