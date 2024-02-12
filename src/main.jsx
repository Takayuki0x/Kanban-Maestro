import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
)
