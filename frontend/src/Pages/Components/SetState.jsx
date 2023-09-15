import React from 'react'

export default function SetState({ client }) {
    function handleStateUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/update_state",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
			console.log(response)
		})
	}

    return (
    
        <form onSubmit={handleStateUpdate} className='property-form'>
            <label htmlFor="state-select">State</label>
            <select name="state" id="state-select">
                <option value="1">Cutting</option>
                <option value="2">Maintaining</option>
                <option value="3">Bulking</option>
            </select>
            <button className="border" type='submit'><h4>Submit</h4></button>
        </form>
   
    )
}
