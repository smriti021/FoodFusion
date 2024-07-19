import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [search, setSearch]=useState('');
  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);

  const loadData=async()=>{
    let response=await fetch("http://localhost:4500/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);

  }

  useEffect(()=>{
    loadData()
  },[])


  return (
    
    <div style={{ backgroundColor: '#121212', color: '#ffffff' }}>
        <div> <Navbar/> </div>
        
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} style={{ backgroundColor: '#333333', color: '#ffffff', border: '1px solid #555555' }} />
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://img.freepik.com/free-photo/flame-grilled-meat-cooking-flames-generative-ai_188544-12355.jpg?t=st=1720967355~exp=1720970955~hmac=9559bda7cd1905c87035d3f1b41c73a09733921eccb50f6a76efc14c420c14d2&w=2000" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="grilled"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/freshly-baked-pizza-rustic-wooden-table-generated-by-ai_24640-82246.jpg?t=st=1720967278~exp=1720970878~hmac=e32d136f854c468f5eb2a07671f6f0625753b55e80e49dc4f7c0975683161fe2&w=2000" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="pizza"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/cheeseburger-with-french-fries-ketchup-wooden-table-ai-generative_123827-24161.jpg?t=st=1720968031~exp=1720971631~hmac=38110b36e60a2bc797c128d6687228c055172d59117f66e93c08770df2c99d46&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="burger"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/high-angle-chocolate-cake-slices-with-spoon_23-2148689809.jpg?t=st=1720967550~exp=1720971150~hmac=93e9f5c3eaa45dad038291a03038159033490ddb5a1d287bfd28ea236827ca58&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="pastry"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/cocktail-glasses_144627-34955.jpg?t=st=1720967035~exp=1720970635~hmac=27f03e1591bd503025bb24183c6b8ce8d0fab90bd68483ac5267af87baf3d133&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="mocktails"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/top-view-biscuit-rolls-with-cup-tea-dark-surface_140725-75085.jpg?t=st=1720967718~exp=1720971318~hmac=777cf6f0949797325e807ce18d964551900223155c464ee750abe6ba30efaf11&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="sweet"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/delicious-assortment-traditional-roti_23-2149033985.jpg?t=st=1720967897~exp=1720971497~hmac=5461a227df711fa301c2fb91b14f6330de39e8729d21770ea539d24ede30428e&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="bread"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/plate-food-with-side-sauce_188544-8402.jpg?t=st=1720968068~exp=1720971668~hmac=7dcfcc23d82039b7d5a9596c8052fddbd963fe13c15a9e2ef12d279d25b36ee3&w=2000" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="momos"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/appetizing-spaghetti-italian-pasta-with-tomato-sauce_1150-20316.jpg?t=st=1720967144~exp=1720970744~hmac=31aece8e27d7203e6a77b18a37f78323ae3a198671c7fe1c1ef55b21aef9ec8d&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="pasta"/>
    </div>
    <div className="carousel-item">
      <img src="https://img.freepik.com/free-photo/close-up-delicious-chocolate-cookies-jar_23-2148414054.jpg?t=st=1720967656~exp=1720971256~hmac=c824657d434609ecbf5c0daf8df97c6fb33b8856aba050fec33680118af39f4b&w=1800" className="d-block w-100" style={{filter:"brightness(50%)"}} alt="cookies"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

        <div className='container'> 
          {
            foodCat.length>0 
            ? foodCat.map((data)=>{
              return (
                <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length>0 
                ? foodItem.filter((item)=>(item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filterItems=>{
                  return(
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card foodItem={filterItems}
                      options={filterItems.options[0]}
                      ></Card>
                    </div>
                  )
                }
                ) : <div> No such data found.</div>}
                </div>

              )
            }) 
            : <div>Loading...</div> 
          } 
        </div>
        <div> <Footer/> </div>
    </div>
  );
}
