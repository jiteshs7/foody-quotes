import React, { useEffect, useState } from "react";
import Card from "../../ui//card/Card";
import MealItem from "../mealItem/MealItem";
import styles from "./MealAvailabiltiy.module.css";

function MealAvailability() {

  const [meals,fetchmeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    getMeals();
  },[])

  const getMeals = () => {

    fetch('https://foodordering-5830f-default-rtdb.firebaseio.com/meals.json')
    .then(resp => resp.json())
    .then(resp => {
      const loadedMeals = []

      for(let key in resp){
        loadedMeals.push({
          id:key,
          name: resp[key].name,
          description: resp[key].description,
          price: resp[key].price
        })
      }
      fetchmeals(loadedMeals)
      setIsLoading(false);
    })
    .catch(err => {
      console.log('ERROR',err);
      setIsLoading(false);
      setHttpError(err.message)
    })
  } 

  if(httpError) return <section className={styles.infoText} style={{color:'red'}} >
    <p>{httpError}</p>
  </section>
  
  if(isLoading) return <section className={styles.infoText} >
  <p>Loading...</p>
</section>

  const mealsList = meals.map((data) => <MealItem key={data.id} meal={data} /> );
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default MealAvailability;
