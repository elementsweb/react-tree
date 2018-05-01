# React Tree

## __In development!__
TODO: Add description

✔️ Integrates with your existing Redux store to allow you to writing middleware for actions emitted by the component

✔️ Support for multiple reusable React-Redux components in an existing Redux application through separate state reduction

✔️ Custom state selectors to store component state in separate places in the Redux store

## Demo
You can import your component into the storybook, a good place to showcase your component.

Run the storybook with `npm run storybook` and navigate to `http://localhost:6006` in your browser.

### Github Pages
Before commiting your changes to Github you can run `npm run build-storybook` to build the storybook so that it can be hosted on Github pages.

## Usage
### Import the component
Import the component/s into your project:

```javascript
import Tree from '@j154004/react-tree';
```

Add the component to a parent component:
```javascript
<Tree selectState={state => state.itemTypeTwo.component} namespace="one" />
```

- __`selectState`__ is a function to tell the component where it should store its state in your application store.

- __`namespace`__ is the namespace to use in action types. For the above example the action trigger would look something like: `@@react-tree/two/INCREMENT_COUNTER`. Defaults to `default`, but it's recommended you always use a key, especially if you use the same component multiple times in one view.

### Include reducers
You can store the component state anywhere in your Redux store, just import the component reducer:

```
import { combineReducers } from 'redux';
import { componentReducer } from '@j154004/react-tree';

const rootReducer = combineReducers({
  itemTypeTwo: combineReducers({
    component: componentReducer('two')
  })
});
```

### Import SASS styles
Import the styles into your project also (in an existing SASS file):

```
@import "~MODULE_NAME/src/styles";
```

### Include SASS in Webpack build
Add another path to include in the rule for SCSS files:

```javascript
{
  test: /\.scss$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, 'src'),
        componentModulePath
      ]
    }
  }]
}
```

