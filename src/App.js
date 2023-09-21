import { React, useEffect, useContext } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from './component/home.jsx';
import DetailView from './component/page/detailView/detailView.jsx';
import { API_URL } from './component/config/config.jsx'
import axios from 'axios';
import { DataContext } from './component/context.jsx';

function App() {
  const {setDataJson} = useContext(DataContext);
  
  useEffect(() => {
    axios.get(API_URL + "restaurants")
      .then(res => {
        setDataJson(res.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, [setDataJson]);
  

  return (
    <BrowserRouter>
      <div style={{ padding: '50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailView/:index" element={<DetailView />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
