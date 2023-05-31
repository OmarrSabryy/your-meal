import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMeals = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://orderfood-db414-default-rtdb.firebaseio.com/meals.json"
    );
    const data = await response.json();
    let meals = [];
    for (const key in data) {
      meals.push({
        id: data[key].id,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setFetchedMeals(meals);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, []);
  const mealsList = fetchedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles["available-meals"]}>
      <Card>
        <ul>{isLoading ? <h1>fetching meals ... </h1> : mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
