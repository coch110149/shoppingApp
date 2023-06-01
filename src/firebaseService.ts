import { getFirebaseDatabase } from './firebaseConfig';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import {Meal} from './pages/MealList';
const db = getFirebaseDatabase();

// Add a meal to the database
export const addMeal = (mealData: any) => {
    return new Promise<void>((resolve, reject) => {
      const mealsRef = ref(db, 'meals');
      const newMealsRef = push(mealsRef);
      set(newMealsRef, mealData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);      
    });
  });
};

export const fetchMeals = async () => {
  const mealsRef = ref(db, 'meals');
  return new Promise((resolve, reject) => {
    onValue(
      mealsRef,
      (snapshot) => {
        const meals: Record<string, Meal> = {};
        snapshot.forEach((childSnapshot) => {
          const mealId = childSnapshot.key as string;
          const mealData = childSnapshot.val();
          meals[mealId] = {...mealData, id: mealId};
        });
        resolve(meals);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
