import React from 'react'
import { toast } from 'react-toastify';

export default function SetState({ client }) {
    function handleStateUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let newState = Object.fromEntries(formData)["state"];
        
        if (newState >= 1 && newState <= 3) {
            client.post(
                "/api/update_state",
                formData,
                {withCredentials: true},
                
                
            ).then(function(response){
                
                toast.success(`State updated`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
        } else {
            toast.warning(`You must select a state`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
		
	}

    return (
    
        <form onSubmit={handleStateUpdate} className='property-form'>
            <label htmlFor="state-select">State</label>
            <select name="state" id="state-select">
                <option value="0">Select State</option>
                <option value="1">Cutting</option>
                <option value="2">Maintaining</option>
                <option value="3">Bulking</option>
            </select>
            <button className="border" type='submit'><h4>Update</h4></button>
        </form>
   
    )
}
