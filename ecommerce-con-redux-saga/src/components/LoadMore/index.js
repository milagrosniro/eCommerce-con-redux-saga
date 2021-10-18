import React from 'react';
import Buttom from '../Forms/Buttom';

const LoadMore = ({
  onLoadMoreEvt = () => { },
}) => {
  return (
    <Buttom onClick={() => onLoadMoreEvt()}>
      Load More
    </Buttom>
  );
};

export default LoadMore; 