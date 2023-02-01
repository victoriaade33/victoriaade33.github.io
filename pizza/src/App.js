import './App.css';
import React, {useState, useEffect} from "react";

function App() {

  const [query, setQuery] = useState('');

  const [container, setContainer] =  useState ([]);

  const [endPoint, setEndPoint] =  useState ('');

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd36eff2fbbmsh037c12ac642267ep18e180jsn8a36d53ab96c',
      'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
    }
  };

  useEffect( ()=> {
      //https://rapidapi.com/
          fetch(`https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=+${query}`, options)
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  setContainer(data.hints);
              })
              .catch(err => {
                  console.error(err)
              });

    }, [endPoint]);

  const onChangeHandler = (e) => {
      setQuery(e.target.value);
  }

  const submitHandler = (e) => {
      e.preventDefault();
      setEndPoint(query);
  }

  return (
    <div className="App">

        <form onSubmit={submitHandler}>
            <input type="text" value={query} onChange={onChangeHandler}/>
            <button type="submit">Submit</button>
        </form>
        <div className="element">
            {container.map((item, index) => {
                return (
                    <div key={index} className="element-div">
                        <img src={item.food.image} alt=""/>
                        <p>{item.food.label}</p>
                    </div>
                )
            })}
        </div>

    </div>
  );
}

export default App;
