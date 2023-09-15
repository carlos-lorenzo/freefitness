import React from 'react'

export default function SetHeight({ client }) {

    function handleHeightUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/update_height",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
			console.log(response)
		})
	}


    return (
        <form onSubmit={handleHeightUpdate}>
            <input type="number" placeholder='height (cm)'/>
            <button type="submit" className='border'><h4>Submit</h4></button>
        </form>
    )
}
