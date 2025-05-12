import { createRoot } from 'react-dom/client';
import Options from './Options';

const root = createRoot(document.getElementById('optionsRoot') as HTMLElement);
root.render(<Options />);
