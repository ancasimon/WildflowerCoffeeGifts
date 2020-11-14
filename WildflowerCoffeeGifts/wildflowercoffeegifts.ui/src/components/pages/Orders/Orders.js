import React from 'react';
import { Table } from 'reactstrap';

import './Orders.scss';

class Orders extends React.Component {
  render() {
    return (
            <div>
              <h1 className="text-center m-3">Order History</h1>
                  <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Qty Ordered</th>
          <th>Total Price</th>
          <th>Purchase Date</th>
          <th>Completed Order</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Payment</th>
          <th>User Account Is Active</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>

            </div>
    );
  }
}

export default Orders;
