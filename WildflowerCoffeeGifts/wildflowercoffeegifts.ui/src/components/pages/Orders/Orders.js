import React from 'react';
import { Table } from 'reactstrap';
import ordersData from '../../../helpers/data/ordersData';
import OrderLineInfo from './OrderLineInfo';

import './Orders.scss';

class Orders extends React.Component {
  state = {
    orderTableInfo: [],
  }

  getAdminOrderInfo = () => {
    ordersData.viewAllOrders()
      .then((orderTableInfo) => this.setState({ orderTableInfo }))
      .catch((err) => console.error('unable to get order info'));
  }

  componentDidMount() {
    this.getAdminOrderInfo();
  }

  render() {
    const { orderTableInfo } = this.state;
    const viewOrderDetails = () => orderTableInfo.map((order) => <OrderLineInfo key={order.id} order={order}/>);
    console.error(viewOrderDetails);
    return (
      <div>
      <h1 className="text-center m-3">Order History</h1>
        <Table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Product</th>
              <th>Qty Ordered</th>
              <th>Total Price</th>
              <th>Purchase Date</th>
              <th>Payment</th>
              <th>Completed Order</th>
            </tr>
          </thead>
            {viewOrderDetails()}
      </Table>
    </div>
    );
  }
}

export default Orders;
