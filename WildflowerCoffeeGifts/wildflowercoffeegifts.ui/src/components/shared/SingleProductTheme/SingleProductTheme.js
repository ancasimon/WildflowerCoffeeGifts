import React from 'react';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div>
        {theme.theme}
      </div>
    );
  }
}
export default SingleProductTheme;
