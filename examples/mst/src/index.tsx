import './index.less';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider, rootStore } from '@/models/Root';
import router from './router';
import { PageLoading } from './components/PageLoader';
// import reportWebVitals from './reportWebVitals';

function App() {
  return (
    // <React.StrictMode>
    <Provider value={rootStore}>
      <RouterProvider
        router={router}
        fallbackElement={<PageLoading />}
      />
    </Provider>
    // </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
