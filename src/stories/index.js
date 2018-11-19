import React from 'react';
import axios from 'axios';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select, { OptGroup, Option } from '../Select';
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
    options: fruits,
  },
  {
    label: 'Veggies',
    value: 'veggies',
    options: veggies,
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
    options: pepsiColas,
  },
  {
    label: 'CocaColas',
    value: 'cocacolas',
    options: cocaColas,
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
    options: food,
  },
  {
    label: 'Drinks',
    value: 'drinks',
    options: drinks,
  },
];

const largeSet = Array.from(Array(1000)).map((x, index) => ({
  label: `Item ${index + 1}`,
  value: `item-${index + 1}`,
}));

storiesOf('Select', module)
  .add('Select', () => (
    <>
      <Select
        options={largeSet}
      />
    </>
  ))
  


  // .add('OptGroup nested js', () => (
  //   <Option options={[
  //     {
  //       label: 'Egypt',
  //       value: 'Egypt',
  //     },
  //     {
  //       label: 'UAE',
  //       value: 'UAE',
  //     },
  //     {
  //       label: 'KSA',
  //       value: 'KSA',
  //       options: [
  //         {
  //           label: 'Egypt',
  //           value: 'Egypt',
  //         },
  //         {
  //           label: 'UAE',
  //           value: 'UAE',
  //         },
  //         {
  //           label: 'KSA',
  //           value: 'KSA',
  //         }
  //       ]
  //     }
  //   ]}>
  //     Countries
  //   </Option>
  // ))
  // .add('OptGroup nested', () => (
  //   <OptGroup label="Countries">
  //     <Option value="canada">Canada</Option>
  //     <Option selected value="france">France</Option>
  //     <Option disabled value="egypt">Egypt</Option>

  //     <OptGroup label="Countries">
  //       <Option value="canada">Canada</Option>
  //       <Option value="france">France</Option>
  //       <Option value="egypt">Egypt</Option>
  //     </OptGroup>
  //   </OptGroup>
  // ))
  // .add('OptGroup js', () => (
  //   <OptGroup label="Countries" options={[
  //     {
  //       label: 'Egypt',
  //       value: 'Egypt',
  //     },
  //     {
  //       label: 'UAE',
  //       value: 'UAE',
  //     },
  //     {
  //       label: 'KSA',
  //       value: 'KSA',
  //     }
  //   ]} />
  // ))
  // .add('OptGroup', () => (
  //   <OptGroup label="Countries">
  //     <Option value="canada">Canada</Option>
  //     <Option value="france">France</Option>
  //     <Option value="egypt">Egypt</Option>
  //   </OptGroup>
  // ))
  // .add('Simple', () => (
  //   <>
  //     <Option>One</Option>
  //     <Option selected>One</Option>
  //     <Option disabled>One</Option>
  //   </>
  // ))
  
  
  
  
  
  
  
  // .add('Simple', () => (
  //   <Select
  //     data={fruits}
  //   />
  // ))
  // .add('Nested', () => (
  //   <Select
  //     data={food}
  //   />
  // ))
  // .add('Deeply nested', () => (
  //   <Select
  //     data={consumables}
  //   />
  // ))
  // .add('Handle onChange', () => (
  //   <Select
  //     data={fruits}
  //     onChange={action('on-change')}
  //   />
  // ))
  // .add('Custom render', () => (
  //   <Select
  //     data={consumables}
  //     render={(selection, openMenu) => (
  //       <>
  //         Selected: {(() => {
  //           if (selection.length) {
  //             return <strong>{selection[0].path}</strong>;
  //           }
  //         })()}
  //         <button onClick={openMenu}>Open</button>
  //       </>
  //     )}
  //   />
  // ))
  // .add('Custom itemRender', () => (
  //   <Select
  //     data={fruits}
  //     renderItem={(item) => (
  //       <button>
  //         {item.label}
  //       </button>
  //     )}
  //   />
  // ))
  // .add('Search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //   />
  // ))
  // .add('Custom search (sensitev)', () => (
  //   <Select
  //     data={fruits}
  //     search
  //     searchHandler={
  //       (items, query) => {
  //         return items.filter(item => item.label.includes(query))
  //       }
  //     }
  //   />
  // ))
  // .add('Async search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //     searchHandler={
  //       (items, query) => new Promise(resolve => {
  //         clearTimeout(timeout);
  //         timeout = setTimeout(resolve, 3000, Select.find(items, query));
  //       })
  //     }
  //   />
  // ))
  // .add('API search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //     searchHandler={
  //       (items, query) => new Promise((resolve, reject) => {
  //         clearTimeout(timeout);
  //         timeout = setTimeout(() => {
  //           axios.get(`http://api-testing.instascaler.com/v2/locations?search=${query}`, {
  //             headers: {
  //               'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvdGVzdGluZ0BpbnN0YXNjYWxlci5jb20iLCJpYXQiOjE1NDIwMjAwOTAsImV4cCI6MTU0MjA2MzI5MH0.8GAoOlYztlnuflHwOrR6ZNZ7W9tRe2Pgq4W6KgevI1E',
  //             }
  //           }).then(({ data }) => {
  //             resolve(data.map(country => ({
  //               label: country.name,
  //               value: country._id.toString(),
  //               items: country.regions.map(region => ({
  //                 label: region.name,
  //                 value: region._id.toString(),
  //                 items: region.cities.map(city => ({
  //                   label: city.name,
  //                   value: city._id.toString(),
  //                 })),
  //               })),
  //             })))
  //           })
  //         }, 500);
  //       })
  //     }
  //   />
  // ))
  // .add('Multiple options', () => (
  //   <Select
  //     data={consumables}
  //     multiple
  //   />
  // ))
;



















// import Select, { OptGroup, Option } from '../Select';
// import './styles.css';

// let timeout;

// const fruits = [
//   {
//     label: 'Bananas',
//     value: 'bananas',
//   },
//   {
//     label: 'Apples',
//     value: 'apples',
//   },
//   {
//     label: 'Oranges',
//     value: 'oranges',
//   },
// ];

// const veggies = [
//   {
//     label: 'Carrots',
//     value: 'carrots',
//   },
//   {
//     label: 'Cabbage',
//     value: 'cabbage',
//   },
//   {
//     label: 'Weird apples',
//     value: 'weird apples',
//   },
// ];

// const food = [
//   {
//     label: 'Fruits',
//     value: 'fruits',
//     options: fruits,
//   },
//   {
//     label: 'Veggies',
//     value: 'veggies',
//     options: veggies,
//   },
// ];

// const pepsiColas = [
//   {
//     label: 'Merinda',
//     value: 'merinda',
//   },
//   {
//     label: 'Pepsi',
//     value: 'pepsi',
//   },
//   {
//     label: 'Sevenup',
//     value: 'sevenup',
//   },
// ];

// const cocaColas = [
//   {
//     label: 'Fanta',
//     value: 'fanta',
//   },
//   {
//     label: 'Cocacola',
//     value: 'cocacola',
//   },
//   {
//     label: 'Sprite',
//     value: 'sprite',
//   },
// ];

// const drinks = [
//   {
//     label: 'PepsiColas',
//     value: 'pepsicolas',
//     options: pepsiColas,
//   },
//   {
//     label: 'CocaColas',
//     value: 'cocacolas',
//     options: cocaColas,
//   },
//   {
//     label: 'Weird apples',
//     value: 'weird apples',
//   },
// ];

// const consumables = [
//   {
//     label: 'Food',
//     value: 'food',
//     options: food,
//   },
//   {
//     label: 'Drinks',
//     value: 'drinks',
//     options: drinks,
//   },
// ]

// storiesOf('Select', module)
//   .add('Select', () => (
//     <>
//       <Select
//         options={consumables}
//       />
//     </>
//   ))
//   .add('OptGroup nested js', () => (
//     <Option options={[
//       {
//         label: 'Egypt',
//         value: 'Egypt',
//       },
//       {
//         label: 'UAE',
//         value: 'UAE',
//       },
//       {
//         label: 'KSA',
//         value: 'KSA',
//         options: [
//           {
//             label: 'Egypt',
//             value: 'Egypt',
//           },
//           {
//             label: 'UAE',
//             value: 'UAE',
//           },
//           {
//             label: 'KSA',
//             value: 'KSA',
//           }
//         ]
//       }
//     ]}>
//       Countries
//     </Option>
//   ))
//   .add('OptGroup nested', () => (
//     <OptGroup label="Countries">
//       <Option value="canada">Canada</Option>
//       <Option selected value="france">France</Option>
//       <Option disabled value="egypt">Egypt</Option>

//       <OptGroup label="Countries">
//         <Option value="canada">Canada</Option>
//         <Option value="france">France</Option>
//         <Option value="egypt">Egypt</Option>
//       </OptGroup>
//     </OptGroup>
//   ))
//   .add('OptGroup js', () => (
//     <OptGroup label="Countries" options={[
//       {
//         label: 'Egypt',
//         value: 'Egypt',
//       },
//       {
//         label: 'UAE',
//         value: 'UAE',
//       },
//       {
//         label: 'KSA',
//         value: 'KSA',
//       }
//     ]} />
//   ))
//   .add('OptGroup', () => (
//     <OptGroup label="Countries">
//       <Option value="canada">Canada</Option>
//       <Option value="france">France</Option>
//       <Option value="egypt">Egypt</Option>
//     </OptGroup>
//   ))
//   .add('Simple', () => (
//     <>
//       <Option>One</Option>
//       <Option selected>One</Option>
//       <Option disabled>One</Option>
//     </>
//   ))
  // .add('Simple', () => (
  //   <Select
  //     data={fruits}
  //   />
  // ))
  // .add('Nested', () => (
  //   <Select
  //     data={food}
  //   />
  // ))
  // .add('Deeply nested', () => (
  //   <Select
  //     data={consumables}
  //   />
  // ))
  // .add('Handle onChange', () => (
  //   <Select
  //     data={fruits}
  //     onChange={action('on-change')}
  //   />
  // ))
  // .add('Custom render', () => (
  //   <Select
  //     data={consumables}
  //     render={(selection, openMenu) => (
  //       <>
  //         Selected: {(() => {
  //           if (selection.length) {
  //             return <strong>{selection[0].path}</strong>;
  //           }
  //         })()}
  //         <button onClick={openMenu}>Open</button>
  //       </>
  //     )}
  //   />
  // ))
  // .add('Custom itemRender', () => (
  //   <Select
  //     data={fruits}
  //     renderItem={(item) => (
  //       <button>
  //         {item.label}
  //       </button>
  //     )}
  //   />
  // ))
  // .add('Search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //   />
  // ))
  // .add('Custom search (sensitev)', () => (
  //   <Select
  //     data={fruits}
  //     search
  //     searchHandler={
  //       (items, query) => {
  //         return items.filter(item => item.label.includes(query))
  //       }
  //     }
  //   />
  // ))
  // .add('Async search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //     searchHandler={
  //       (items, query) => new Promise(resolve => {
  //         clearTimeout(timeout);
  //         timeout = setTimeout(resolve, 3000, Select.find(items, query));
  //       })
  //     }
  //   />
  // ))
  // .add('API search', () => (
  //   <Select
  //     data={consumables}
  //     search
  //     searchHandler={
  //       (items, query) => new Promise((resolve, reject) => {
  //         clearTimeout(timeout);
  //         timeout = setTimeout(() => {
  //           axios.get(`http://api-testing.instascaler.com/v2/locations?search=${query}`, {
  //             headers: {
  //               'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvdGVzdGluZ0BpbnN0YXNjYWxlci5jb20iLCJpYXQiOjE1NDIwMjAwOTAsImV4cCI6MTU0MjA2MzI5MH0.8GAoOlYztlnuflHwOrR6ZNZ7W9tRe2Pgq4W6KgevI1E',
  //             }
  //           }).then(({ data }) => {
  //             resolve(data.map(country => ({
  //               label: country.name,
  //               value: country._id.toString(),
  //               items: country.regions.map(region => ({
  //                 label: region.name,
  //                 value: region._id.toString(),
  //                 items: region.cities.map(city => ({
  //                   label: city.name,
  //                   value: city._id.toString(),
  //                 })),
  //               })),
  //             })))
  //           })
  //         }, 500);
  //       })
  //     }
  //   />
  // ))
  // .add('Multiple options', () => (
  //   <Select
  //     data={consumables}
  //     multiple
  //   />
  // ))
  // ;
