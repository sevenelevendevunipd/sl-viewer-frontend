import { useState } from 'react';
import { LogParserResponse_4dfe1dd } from './openapi';

import { Button } from 'primereact/button';


import "./themes/theme.scss";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import LogUploader from './components/LogUploader';
import LogViewer from './components/LogViewer';
import { ThemeSwitcher, ThemeProvider } from './components/ThemeSwitcher';
import { ReactComponent as Logo } from './logo.svg';

function App() {
  const [log, setLog] = useState<LogParserResponse_4dfe1dd | undefined>(undefined);
  return (<ThemeProvider>
    <nav className='w-full flex flex-row justify-content-between surface-ground p-3'>
      <Logo className='h-3rem w-auto' id='logo' />
      {log !== undefined ? <Button label="Upload another log" icon="pi pi-upload" onClick={() => setLog(undefined)} /> : null}
      <ThemeSwitcher />
    </nav>
    <div className='mt-4'>
      {log === undefined ? <LogUploader setLog={setLog} /> : <LogViewer log={log} />}
    </div>
  </ThemeProvider>);
}

export default App;
