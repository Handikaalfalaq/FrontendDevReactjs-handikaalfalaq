import { React, useState, useEffect, useContext} from 'react'
import { Button, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../context';
import '../../assets/style.css';
import FolderImage from '../../assets/folderImage';
import ModalTambahMenu from '../modal/modalTambahMenu'
import ModalUpdateRestaurant from '../modal/modalUpdateRestaurant'
import ModalUpdateMenu from '../modal/modalUpdateMenu'

function DetailView() {
  const {newDataDetailView} = useContext(DataContext);
  const navigate = useNavigate()
  const [dataDetileView, setDataDetileView] = useState([]);
  const [loading, setLoading] = useState(true)
  const [tambahMenu, setTambahMenu] = useState(false)
  const [updateRestaurant, setUpdateRestaurant] = useState(false)
  const [updateMenu, setUpdateMenu] = useState(false)
  const [idMenu, setIdMenu] = useState()
  const { index } = useParams();
  const location = useLocation();  

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === '/') {
        setDataDetileView([]);
      }
      setLoading(true)
      try {
        if (newDataDetailView.length !== 0){
          setDataDetileView(newDataDetailView[index]);
          setLoading(false)
        } else {
          navigate(`/`);
        }
    } catch (error) {
        console.log(error); 
      }
    };
    fetchData();
  }, [index, loading, newDataDetailView, location.pathname, dataDetileView, navigate]);

  const closeDetailView = () => {
    navigate(`/`);
  }

  const handleOpenModal = () => { setTambahMenu(true); }

  const handleOpenUpdateRestaurant = () => {setUpdateRestaurant(true);}
  const handleOpenUpdateMenu = (index) => {
    setUpdateMenu(true);
    setIdMenu(index)
  }

  return(
  <>
    {loading === false ? ( 
        <div className="detailView">
          <div className="headerDetailView">
            <div className="titleDetailView">
              <div>{dataDetileView.namaRestaurant}</div>
              <div style={{ display: 'flex' }}>
                {Array(5).fill().map((_, indexBintang) => (
                    <div key={indexBintang} style={{opacity:indexBintang < dataDetileView.ratingRestaurant ? 1 : 0.5, }}>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  ))}
              </div>
              <div>{dataDetileView.jenisMakanan}</div>
              <Button className="buttonUpdate" onClick={handleOpenUpdateRestaurant}>Update Restaurant</Button>
            </div>
            <Button className="closeDetailView" onClick={() => closeDetailView()}>x</Button>
          </div>

          {dataDetileView.daftarMenu.length !== 0 ? (
            <div className="bodyDetailView">
              {dataDetileView.daftarMenu.map((data, index) => (
                <Card className="cardDetailView" key={index}> 
                  {FolderImage[data.imageMenu] ? (
                    <div className='imageDetailView' style={{ backgroundImage: `url(${FolderImage[data.imageMenu]})`}}></div>
                  ) : (
                    <div className='imageSection'>Tidak ada gambar</div>
                  )}
                  <Card.Body>
                    <Card.Title>{data.namaMenu}</Card.Title>
                    <div style={{ display: 'flex' }}>
                      {Array(5).fill().map((_, indexBintang) => (
                          <div key={indexBintang} style={{opacity: indexBintang < data.ratingMenu ? 1 : 0.5}}>
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                        ))}
                    </div>
                    <ListGroup.Item className='hargaSection'>Rp.{data.harga.toLocaleString()}</ListGroup.Item>
                    <Card.Text className="informasiMenuDetailView">{data.informasiMenu}</Card.Text>
                    <Button className="buttonUpdateMenu" onClick={() => handleOpenUpdateMenu(index)}>Update Menu</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
            ) : (
              <div className='tidakAdaMenu'>Belumn ada menu</div>
            )}

        <Button className='buttonSectionTambahMenu' onClick={handleOpenModal}>Tambah Menu</Button>
        <ModalTambahMenu show={tambahMenu} onHide={()=> setTambahMenu(false)} id={dataDetileView.id}/>
        <ModalUpdateRestaurant show={updateRestaurant} onHide={()=> setUpdateRestaurant(false)} dataDetileView={dataDetileView}/>
        <ModalUpdateMenu show={updateMenu} onHide={()=> setUpdateMenu(false)} dataDetileView={dataDetileView} idMenu={idMenu}/>

        <Button className="buttonCloseDetailView" onClick={() => closeDetailView()} > close </Button>
        </div>
      
    ) : (
      <>Loading</>
    )}


  </>
);
}

export default DetailView;