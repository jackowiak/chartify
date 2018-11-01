import React from 'react';

import { Row, Col } from 'reactstrap';

export const Loader = () => {
  return (
    <Row className="loader align-items-center">
      <Col xs={{ size: 6, offset: 3 }}>
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </Col>
    </Row>
  )
}
