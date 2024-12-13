import r2wc from '@r2wc/react-to-web-component';
import App from './App';
import { HashRouter } from 'react-router';

export default function Widget({ ...props } : any) {
  console.log('load app', props);
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

customElements.define('syatlas-widget', r2wc(Widget, {
  props: {
    key: 'string',
  },
}));
