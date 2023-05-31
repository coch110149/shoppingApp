import { getFirebaseDatabase } from './firebaseConfig';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

const db = getFirebaseDatabase();

// Add a meal to the database
export const addMeal = (mealData: any) => {
  const mealsRef = ref(db, 'meals');
  const newMealsRef = push(mealsRef);
  set(newMealsRef, mealData);
};

export const fetchMeals = async () => {
  const mealsRef = ref(db, 'meals');
  return new Promise((resolve, reject) => {
    onValue(
      mealsRef,
      (snapshot) => {
        const meals = snapshot.val();
        // Process the meals data as needed
        resolve(meals);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
