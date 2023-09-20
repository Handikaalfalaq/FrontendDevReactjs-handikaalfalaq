import { React, useState, useEffect, useContext } from 'react'
import { Button, Card, ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import { DataContext } from '../../context';
import FolderImage from '../../assets/folderImage';
import { restoranBukaJamIni, hitungHargaTermurah, hitungHargaTermahal } from '../../utils/utils'
import ModalTambahRestaurant from '../modal/modalTambahRestaurant';
 
function Section({status, price, categories}) {
  const {dataJson, setNewDataDetailView} = useContext(DataContext);
  const [newDataJson, setNewDataJson] = useState([]);
  const [newStatus, setNewStatus] = useState(undefined);
  const [newPriceMin, setNewPriceMin] = useState(0);
  const [newPriceMax, setNewPriceMax] = useState(Infinity);
  const [newCategories, setNewCategories] = useState('Categories');
  const [loading, setLoading] = useState(true);
  const [tambahRestaurant, setTambahRestaurant] = useState(false);
  const [jumlahData, setJumlahData] = useState(8);
  const newDataJsonSlice = newDataJson.slice(0, jumlahData);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setNewDataJson([]);
      setNewPriceMin(0);
      setNewPriceMax(Infinity);
      setLoading(true);
      setNewCategories('Categories');
      setNewDataDetailView([]);
      try {

        if(status === 'Open Now'){
          setNewStatus(true)
        } else if (status === 'Closed'){
          setNewStatus(false)
        } else {
          setNewStatus(undefined)
        }

        if (price.includes("<")) {
          const dataArrayPrice = price.replace("<", "");
          setNewPriceMax(parseInt(dataArrayPrice));
        } else if(price.includes(">")) {
          const dataArrayPrice = price.replace(">", "");
          setNewPriceMin(parseInt(dataArrayPrice));
        } else if (price.includes("-")){
          const dataArrayPrice = price.split("-").map(item => parseInt(item.trim()));
          console.log("data array", dataArrayPrice);
          setNewPriceMin(parseInt(dataArrayPrice[0]));
          setNewPriceMax(parseInt(dataArrayPrice[1]));
        }

        if(categories !== 'Categories') {
          setNewCategories(categories)
        }

        for (let i = 0; i < dataJson.length; i++) {
          const jamBuka = restoranBukaJamIni(dataJson[i].status.jamBuka, dataJson[i].status.jamTutup);
          const hargaTermurah = hitungHargaTermurah(dataJson[i]);
          const jenisMakanan = dataJson[i].jenisMakanan;
        
          const condition1 = jamBuka === newStatus && (hargaTermurah >= newPriceMin && hargaTermurah < newPriceMax) && newCategories === "Categories" ;
          const condition2 = jamBuka === newStatus && (hargaTermurah >= newPriceMin && hargaTermurah < newPriceMax) && jenisMakanan === newCategories;
          const condition3 = (newStatus !== true && newStatus !== false) && (hargaTermurah >= newPriceMin && hargaTermurah < newPriceMax) && jenisMakanan === newCategories;
          
          const condition4 = (newStatus !== true && newStatus !== false) && newCategories === "Categories";

          if (condition1 || condition2 || condition3 || condition4) {
            setNewDataJson((prev) => [...prev, dataJson[i]]);
            setNewDataDetailView((prev) => [...prev, dataJson[i]])
          }
        }
         setLoading(false)
        } catch (error) {
          console.log(error); 
      }
    };
    fetchData();
  }, [price, newPriceMin, newPriceMax, newStatus, status, categories, newCategories, setNewDataDetailView, dataJson]);

  const openDetaiView = (index) => {
    navigate(`/detailView/${index}`);
  }

  const handleLoadMore = () => {
    setJumlahData(jumlahData + 4);
  };

  const handleShowLess = () => {
    setJumlahData(jumlahData - 4);
  };

  const handleOpenModal = () => { setTambahRestaurant(true); }
  

  return (
    <>

      {loading ? ( 
        <div className='textDataKosong'>Loading...</div>
      ) : newDataJsonSlice.length !== 0 ? (
        <div className='containerSection'>
        {newDataJsonSlice.map((data, index) => (
          <Card className='cardSection' key={index}>
            {data.daftarMenu.length !== 0 ? (
              FolderImage[data.daftarMenu[0].imageMenu] ? (
                <div className='imageSection' style={{ backgroundImage: `url(${FolderImage[data.daftarMenu[0].imageMenu]})` }}></div>
              ) : (
                <div className='imageSection'>Tidak ada gambar</div>
              )
            ) : (
              <div className='imageSection'>belum ada menu</div>
            )}
            <Card.Body>
              <Card.Title className='titleSection'>{data.namaRestaurant}</Card.Title>
              <div style={{ display: 'flex' }}>
                {Array(5).fill().map((_, indexBintang) => (
                  <div key={indexBintang} style={{opacity: indexBintang < data.ratingRestaurant ? 1 : 0.5,}}>
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                ))}
              </div>  
              <div className='informasiSection'> 
                  <div style={{display:'flex'}}>
                      <ListGroup.Item className='jenisMakananSection'>{data.jenisMakanan}</ListGroup.Item>
                      {data.daftarMenu.length !== 0 ? (
                        <ListGroup.Item className='hargaSection'>Rp.{hitungHargaTermurah(data).toLocaleString()} - Rp.{hitungHargaTermahal(data).toLocaleString()}</ListGroup.Item>
                      ) : (
                        <></>
                      )}
                    </div>
                  
                  {restoranBukaJamIni(data.status.jamBuka,data.status.jamTutup) ? (
                    <ListGroup.Item className='statusSection'> <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} /> OPEN NOW</ListGroup.Item>
                  ) : (
                    <ListGroup.Item className='statusSection'> <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} /> Closed</ListGroup.Item>
                  )}
              </div>

              <Button className='buttonSection' onClick={() => openDetaiView(index)}>LEARN MORE</Button>
            </Card.Body>
          </Card>
      ))}
      </div>
        ) : (
        <div className='textDataKosong'>-Data Tidak Ada-</div>
      )}

      
      <div className='buttonSectionButtom'>
        {newDataJson.length !== 0 && jumlahData < newDataJson.length ? (
          <button className='buttonHome' onClick={handleLoadMore} >LOAD MORE</button>
        ): (
          <></>
        )}

        {jumlahData === 8 ? (
          <></>
        ): (
          <button className='buttonHome' onClick={handleShowLess} >SHOW LESS</button>
        )}
      </div>

      <Button className='buttonSectionTambahRestaurant' onClick={handleOpenModal}>Tambah Restaurant</Button>
      <ModalTambahRestaurant show={tambahRestaurant} onHide={()=> setTambahRestaurant(false)}/>
      
   
   </>
  );
}

export default Section; 
