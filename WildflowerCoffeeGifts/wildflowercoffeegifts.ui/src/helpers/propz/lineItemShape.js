import PropTypes from 'prop-types';

const lineItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  orderId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
});

export default { lineItemShape };
