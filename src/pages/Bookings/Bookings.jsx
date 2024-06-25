import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';
import { useEffect, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {
        axios.get(url, {withCredentials:true})
        .then(res => setBookings(res.data))
        .catch(err => console.log(err));
    }, [url]);

    const handleDelete = id => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
          }).then((result) => {
              if (result.isConfirmed) {
                  fetch(`http://localhost:5000/bookings/${id}`, {
                      method: 'DELETE'
                    })
                  .then(res => res.json())
                  .then(data => {
                      if(data.deletedCount > 0){
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          const remainingBookings = bookings.filter(booking => booking._id !== id);
                          setBookings(remainingBookings);
                          }
                      })
  }
});
}
    const handleBookingConfirm = id => {
      Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
          }).then((result) => {
              if (result.isConfirmed) {
                  fetch(`http://localhost:5000/bookings/${id}`, {
                      method: 'PATCH',
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({status: 'confirmed'})
                    })
                  .then(res => res.json())
                  .then(data => {
                      if(data.modifiedCount > 0){
                          Swal.fire({
                            title: "Updated!",
                            text: "Your file has been Updated.",
                            icon: "success"
                          });
                          const remainingBookings = bookings.filter(booking => booking._id !== id);
                          const updatedBooking = bookings.find(booking => booking._id === id);
                          updatedBooking.status = 'confirmed';
                          const mergedBooking = [...remainingBookings, updatedBooking];
                          setBookings(mergedBooking);
                          }
                      })
  }
});
    }

    return (
        <div>
            <h2 className='text-4xl text-center mb-3'>My Bookings({bookings.length > 0 ? bookings.length : 0})</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th></th>
        <th>Service Title</th>
        <th>Amount</th>
        <th>Order Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        bookings.map(booking => <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}/>)
      }
    </tbody>
  </table>
</div>
</div>
    );
};

export default Bookings;
