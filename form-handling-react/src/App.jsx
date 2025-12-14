import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('controlled');

  return (
    <div className="App">
      <div className="tab-buttons">
        <button 
          className={activeTab === 'controlled' ? 'active' : ''}
          onClick={() => setActiveTab('controlled')}
        >
          Controlled Components
        </button>
        <button 
          className={activeTab === 'formik' ? 'active' : ''}
          onClick={() => setActiveTab('formik')}
        >
          Formik Form
        </button>
      </div>

      {activeTab === 'controlled' && <RegistrationForm />}
      {activeTab === 'formik' && <FormikForm />}
    </div>
  );
}

export default App;