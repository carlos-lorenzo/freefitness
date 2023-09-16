import React from 'react'

export default function SetSex({ client }) {
    function handleSexUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/update_sex",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
			console.log(response)
		})
	}

    return (
    
        <form onSubmit={handleSexUpdate} className='property-form'>
            <label htmlFor="sex-select">Sex</label>
            <select name="sex" id="sex-select">
                <option value="1">Male</option>
                <option value="2">Female</option>
            </select>
            <button className="border" type='submit'><h4>Update</h4></button>
        </form>
   
    )
}
