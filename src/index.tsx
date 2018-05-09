import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Projects from './projects/ProjectsContainer'
import { Provider } from 'react-redux'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './configureStore'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Projects />
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
