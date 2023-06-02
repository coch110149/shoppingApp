import { getFirebaseDatabase } from './firebaseConfig';
import { getDatabase, ref, push, set, onValue, remove } from 'firebase/database';
import {Meal} from './pages/MealList';
import { resolve } from 'path';
import { rejects } from 'assert';
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


export const deleteMeal = async (mealId: number) => {
  try {
    const mealRef = ref(db, `meals/${mealId}`);
    await remove(mealRef);
    console.log("Meal deleted successfully.");
  } catch (error) {
    console.error("Error deleting meal:", error);
    throw error;
  }
};

export const editMeal = (mealData: Meal) => {
  return new Promise<void>((resolve, reject) => {
    const mealId = mealData.id;
    const mealRef = ref(db, `meals/${mealId}`);

    set(mealRef, mealData)
      .then(()=> {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};