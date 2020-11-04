import React from 'react';

import lineItemShape from '../../../helpers/propz/lineItemShape';

import './SingleLineItem.scss';

class SingleLineItem extends React.Component {
    static propTypes = {
      item: lineItemShape.lineItemShape,
    }

    render() {
      const { item } = this.props;
      return (
          <tbody>
            <tr>
                <th scope="row">{item.title}</th>
                <td>${item.price}</td>
                <td>{item.qty}</td>
                <td>${item.subtotal}</td>
            </tr>
          </tbody>
      );
    }
}

export default SingleLineItem;
