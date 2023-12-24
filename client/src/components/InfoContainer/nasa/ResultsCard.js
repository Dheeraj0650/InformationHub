import React, {useState, useEffect} from "react";
import ImgCards from './ImgCards';
import '../weather/Results.css';

export default function ResultsCard(props) {

  var [data1, setData1] = useState([]);
  
  useEffect(function(){
    fetch(props.url + props.query,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(collection) {
      var collection = collection.collection.items;
      for(var idx_1 = 0; idx_1 < collection.length; idx_1++){
        var description_1 = collection[idx_1].data[0].title;
        console.log(collection[idx_1])
        fetch(collection[idx_1].href, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(res_data) {
          for(var idx = 0; idx < res_data.length;idx++){
            if(res_data[idx].includes("jpg")){
              console.log(res_data[idx]);
              console.log(data1);
              // data1.push({item: res_data[idx], description:description_1})
              // setData1(data1)
              setData1((prevData) => [
                ...prevData,
                { item: res_data[idx], description: description_1 },
              ]);
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  console.log("data1");
  console.log(data1);
  
  return (
    <div className="container nasa-grid">
      {data1.map((item) => {
        return <ImgCards url={item.item} description={item.description}/>
      })}
    </div>
  )
}
