import Card from '../../components/card/card';
import Filter from '../../components/filter/filter';
import './listPage.scss'
import Map from '../../components/map/map';
import { useLoaderData } from 'react-router-dom';
import HeroImg from '../../components/heroImg/heroImg';

function ListPage(){
  const posts = useLoaderData();

  return (
    <div className='list-page'>
      <div className="list-container">
        <div className="wrapper">
          <Filter></Filter>
          {(posts.length>0) ? <div className="card-container">
            {posts.map((item,index) => 
              <Card key={index} item={item}></Card>
            )}
          </div> :
          <div>
            <h3>No results found</h3>
          </div>
          }
        </div>
      </div>
      <div className="map-container">
        {(posts.length>0) ? <Map items={posts}/> : <HeroImg></HeroImg>}
      </div>
    </div>
  )
}

export default ListPage;
