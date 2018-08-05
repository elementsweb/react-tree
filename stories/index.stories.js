import React from 'react';

import { storiesOf } from '@storybook/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Tree, { componentReducer } from '../src/index';

const sampleData = [
  {
    "slug": "food",
    "created": "2018-01-19T23:19:51.871Z",
    "uuid": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
    "name": "Food"
  }, {
    "slug": "burger",
    "created": "2018-01-20T20:38:12.159Z",
    "ancestors": [
      {
        "name": "Food",
        "uuid": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
        "slug": "food"
      }
    ],
    "uuid": "d5272de0-fe21-11e7-ae09-dd0ad42aba1a",
    "parent": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
    "name": "Burger"
  }, {
    "slug": "hot-dog",
    "created": "2018-01-20T20:38:12.159Z",
    "ancestors": [
      {
        "name": "Food",
        "uuid": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
        "slug": "food"
      }
    ],
    "uuid": "02acb786-a947-5b97-b1b3-b9deb634f22b",
    "parent": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
    "name": "Hot Dog"
  }, {
    "slug": "chips",
    "created": "2018-01-20T20:38:12.159Z",
    "ancestors": [
      {
        "name": "Food",
        "uuid": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
        "slug": "food"
      }
    ],
    "uuid": "5b3e751e-6c51-5e86-b699-7f0e856e7fa1",
    "parent": "403805e0-fd6f-11e7-9f1e-4f11c405dd5a",
    "name": "Chips"
  }, {
    "slug": "drinks",
    "created": "2018-01-19T23:19:51.871Z",
    "uuid": "403805e0-fd6f-11e7-9f1e-4f12c405dd5a",
    "name": "Cola"
  }
];

const initialDomainDataState = sampleData.reduce((accumulator, currentValue) => {
  return Object.assign(accumulator, {
    [currentValue.uuid]: currentValue
  });
}, {});

// create mock root reducer
const rootReducer = combineReducers({
  domainData: combineReducers({
    // tree expects data to have a `byId` object
    byId: (state = initialDomainDataState, action) => {
      return state;
    },
    allIds: (state = sampleData, action) => {
      return state;
    }
  }),
  itemTypeOne: combineReducers({
    // do componentReducer() for 'default'
    component: componentReducer('one')
  }),
  itemTypeTwo: combineReducers({
    component: componentReducer('two')
  })
});

// create the redux store to simulate wrapper application
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (module.hot) {
  module.hot.accept('../src/reducers', () => store.replaceReducer(require('../src/reducers')));
}

storiesOf('Tree', module)
  .add('single component', () => (
    <Provider store={store}>
      <Tree
        selectState={state => state.itemTypeOne.component}
        selectAllIds={state => state.domainData.allIds}
        namespace="one"
      />
    </Provider>
  ));
