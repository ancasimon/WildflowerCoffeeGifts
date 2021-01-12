import React from 'react';
import moment from 'moment';

class OrderLineInfo extends React.Component {
  render() {
    const { order } = this.props;

    return (
        <tbody>
          <tr>
            <td>{order.orderId}</td>
            <td>{order.firstName}</td>
            <td>{order.lastName}</td>
            <td>{order.email}</td>
            <td>{order.lineItems.map((item, indx) => <p key={indx}>{item.title}<h5>({item.qty})</h5></p>)}</td>
            <td>${order.totalPrice}</td>
            <td>{moment(order.purchaseDate).format('L')}</td>
            <td>{order.paymentOption}</td>
            { order.isCompleted !== true ? <td><i class="fas fa-times"></i></td> : <td><i class="fas fa-check-circle"></i></td> }
          </tr>
        </tbody>
    );
  }
}

export default OrderLineInfo;
