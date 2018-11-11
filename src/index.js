import React from 'react';
import ReactDOM from 'react-dom';

import Select from './Select';

const app = (
  <Select
    data={[
      {
        label: 'Bananas',
      },
      {
        label: 'Apples',
      },
      {
        label: 'Oranges',
      },
    ]}
  />
);

ReactDOM.render(app, document.getElementById('root'));
