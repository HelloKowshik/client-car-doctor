const BookingRow = ({ booking, handleDelete, handleBookingConfirm }) => {
    const { _id, amount, orderDate, title, img, status} = booking;

    return (
        <tr>
        <th>
          <button className="btn btn-circle btn-sm btn-outline" onClick={() => handleDelete(_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="rounded w-24 h-24">
                <img src={img} />
              </div>
            </div>
          </div>
        </td>
        <td> {title} </td>
        <td> ${amount} </td>
        <td> {orderDate} </td>
        <th>
          {
            status === 'confirmed' ? <span className='font-bold text-primary'>CONFIRMED</span> : <button className="btn btn-ghost btn-xs" onClick={() => handleBookingConfirm(_id)}>Confirm It</button>
          }
        </th>
      </tr>
    );
};

export default BookingRow;
