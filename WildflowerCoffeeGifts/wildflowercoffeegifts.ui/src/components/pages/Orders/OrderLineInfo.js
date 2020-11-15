import React from 'react';
import PropTypes from 'prop-types';

class OrderLineInfo extends React.Component {
  render() {
    const { order } = this.props;
    return (
        <tbody>
          <tr>
            <th scope="row">{order.title}</th>
            <td>{order.qty}</td>
            <td>{order.totalPrice}</td>
            <td>{order.purchaseDate}</td>
            <td>{order.firstName}</td>
            <td>{order.lastName}</td>
            <td>{order.email}</td>
            <td>{order.paymentOption}</td>
            { order.isActive !== true ? <td><i class="fas fa-times"></i></td> : <td><i class="fas fa-check-circle"></i></td> }
          </tr>
        </tbody>
    );
  }
}

export default OrderLineInfo;
