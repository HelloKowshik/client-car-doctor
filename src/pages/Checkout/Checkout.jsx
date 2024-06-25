import { useLoaderData, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Checkout = () => {
    const { _id, title, price, img} = useLoaderData();
    const { user } = useContext(AuthContext);
    const handleBookOrder = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.fullName.value;
        const date = form.date.value;
        const email = user?.email || form.email.value;
        const message = form.message.value;
        const order = {
            customerName: name,
            customerEmail: email,
            amount: price,
            orderDate: date,
            title,
            img,
            service_id: _id,
            message
        }
        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire("Order is Confirmed!");
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h2 className='text-3xl text-center'>Book Service: {title}</h2>
            <form onSubmit={handleBookOrder}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} name="fullName" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" readOnly defaultValue={'$' + price} name="dueAmount" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Email</span>
                        </label>
                        <input type="email" readOnly={user?.email} defaultValue={user?.email} name="email" className="input input-bordered" required />
                    </div>
                </div>
                    <div className="form-control mt-6">
                        <textarea className="textarea textarea-accent" name='message' placeholder="Message"></textarea>    
                    </div>
                    <div className="form-control mt-6">
                        <input type='submit' className="btn btn-primary btn-block" value='Confirm Order' />
                    </div>
            </form>
        </div>
    );
};

export default Checkout;
