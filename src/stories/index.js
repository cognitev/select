import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from '../Select';

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
    value: 'weird-apples',
  },
];

const food = [
  {
    label: 'Fruits',
    items: fruits,
  },
  {
    label: 'Veggies',
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
    items: pepsiColas,
  },
  {
    label: 'CocaColas',
    items: cocaColas,
  },
  {
    label: 'Weird apples',
    value: 'weird-apples',
  },
];

const consumables = [
  {
    label: 'Food',
    items: food,
  },
  {
    label: 'Drinks',
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
            function getLabel(item) {
              return (
                <strong>
                  {item.parent && (
                    <>
                      {getLabel(item.parent)}
                      &nbsp;/&nbsp;
                    </>
                  )}
                  {item.label}
                </strong>
              );
            }

            if (selection.length) {
              return getLabel(selection[0]);
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
          {item.label}: {item.value}
        </button>
      )}
    />
  ))
  .add('With search', () => (
    <Select
      data={consumables}
      search
    />
  ))
  .add('With custom search (sensitev)', () => (
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
  .add('With async search', () => (
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
;
