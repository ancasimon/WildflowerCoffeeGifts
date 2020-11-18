import React from 'react';

class OrderLineInfo extends React.Component {
  render() {
    const { order } = this.props;

    return (
        <tbody>
          <tr>
            <td>{order.id}</td>
            <td>{order.firstName}</td>
            <td>{order.lastName}</td>
            <td>{order.email}</td>
            <td>{order.title}</td>
            <td>{order.qty}</td>
            <td>{order.totalPrice}</td>
            <td>{order.purchaseDate}</td>
            <td>{order.paymentOption}</td>
            { order.isCompleted !== true ? <td><i class="fas fa-times"></i></td> : <td><i class="fas fa-check-circle"></i></td> }
          </tr>
        </tbody>
    );
  }
}

export default OrderLineInfo;
