import React from 'react';
import axios from 'axios';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from '../Select';
import './styles.css';

let timeout;

const fruits = [
  {
    label: 'Bananas',
    value: 'bananas',
  },
  {
    label: 'Apples',
    value: 'apples',
  },
  {
    label: 'Oranges',
    value: 'oranges',
  },
];

const veggies = [
  {
    label: 'Carrots',
    value: 'carrots',
  },
  {
    label: 'Cabbage',
    value: 'cabbage',
  },
  {
    label: 'Weird apples',
    value: 'weird apples',
  },
];

const food = [
  {
    label: 'Fruits',
    value: 'fruits',
    items: fruits,
  },
  {
    label: 'Veggies',
    value: 'veggies',
    items: veggies,
  },
];

const pepsiColas = [
  {
    label: 'Merinda',
    value: 'merinda',
  },
  {
    label: 'Pepsi',
    value: 'pepsi',
  },
  {
    label: 'Sevenup',
    value: 'sevenup',
  },
];

const cocaColas = [
  {
    label: 'Fanta',
    value: 'fanta',
  },
  {
    label: 'Cocacola',
    value: 'cocacola',
  },
  {
    label: 'Sprite',
    value: 'sprite',
  },
];

const drinks = [
  {
    label: 'PepsiColas',
    value: 'pepsicolas',
    items: pepsiColas,
  },
  {
    label: 'CocaColas',
    value: 'cocacolas',
    items: cocaColas,
  },
  {
    label: 'Weird apples',
    value: 'weird apples',
  },
];

const consumables = [
  {
    label: 'Food',
    value: 'food',
    items: food,
  },
  {
    label: 'Drinks',
    value: 'drinks',
    items: drinks,
  },
]

storiesOf('Select', module)
  .add('Simple', () => (
    <Select
      data={fruits}
    />
  ))
  .add('Nested', () => (
    <Select
      data={food}
    />
  ))
  .add('Deeply nested', () => (
    <Select
      data={consumables}
    />
  ))
  .add('Handle onChange', () => (
    <Select
      data={fruits}
      onChange={action('on-change')}
    />
  ))
  .add('Custom render', () => (
    <Select
      data={consumables}
      render={(selection, openMenu) => (
        <>
          Selected: {(() => {
            if (selection.length) {
              return <strong>{selection[0].path}</strong>;
            }
          })()}
          <button onClick={openMenu}>Open</button>
        </>
      )}
    />
  ))
  .add('Custom itemRender', () => (
    <Select
      data={fruits}
      renderItem={(item) => (
        <button>
          {item.label}
        </button>
      )}
    />
  ))
  .add('Search', () => (
    <Select
      data={consumables}
      search
    />
  ))
  .add('Custom search (sensitev)', () => (
    <Select
      data={fruits}
      search
      searchHandler={
        (items, query) => {
          return items.filter(item => item.label.includes(query))
        }
      }
    />
  ))
  .add('Async search', () => (
    <Select
      data={consumables}
      search
      searchHandler={
        (items, query) => new Promise(resolve => {
          clearTimeout(timeout);
          timeout = setTimeout(resolve, 3000, Select.find(items, query));
        })
      }
    />
  ))
  .add('API search', () => (
    <Select
      data={consumables}
      search
      searchHandler={
        (items, query) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            axios.get(`http://api-testing.instascaler.com/v2/locations?search=${query}`, {
              headers: {
                'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvdGVzdGluZ0BpbnN0YXNjYWxlci5jb20iLCJpYXQiOjE1NDIwMjAwOTAsImV4cCI6MTU0MjA2MzI5MH0.8GAoOlYztlnuflHwOrR6ZNZ7W9tRe2Pgq4W6KgevI1E',
              }
            }).then(r => console.log(r));
          }, 500);
        }
      }
    />
  ))
  .add('Multiple options', () => (
    <Select
      data={consumables}
      multiple
    />
  ))
;
