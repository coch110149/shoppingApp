import { getFirebaseDatabase } from './firebaseConfig';
import {ref, push, set, onValue, remove } from 'firebase/database';
import { Meal } from './pages/MealList';
const db = getFirebaseDatabase();

// Add a meal to the database
export const addMeal = (mealData: Meal) => {
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
          meals[mealId] = { ...mealData, id: mealId };
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
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCurrentMeals = (userId:string, meals: Meal[], scheduledDate: string | null) => {
  return new Promise<void>((resolve, reject) => {
    const currentMealsRef = ref(db, `currentMeals/${userId}`)

    meals.forEach((meal) => {
      const newMealRef = push(currentMealsRef);
      set(newMealRef, {mealId: meal.id, scheduledDate})
      .catch((error) => {
        console.error(`Error Adding Current Meal: ${error}`);
        reject(error);
      });  
    });
    resolve();
  })
}

export const fetchCurrentMeals = async (userId: string) => {
  const currentMealsRef = ref(db, `currentMeals/${userId}`);
  return new Promise((resolve, reject) => {
    onValue(currentMealsRef, (snapshot) => {
      const currentMeals: Record<string, { mealId: string; scheduledDate: string }> = {};
      snapshot.forEach((childSnapshot) => {
        const mealId = childSnapshot.key as string;
        const MealData = childSnapshot.val();
        currentMeals[mealId] = { mealId: MealData.mealId, scheduledDate: MealData.scheduleDate }
      });
      resolve(currentMeals);
    },
      (error) => {
        reject(error);
      }
    )
  })
}

export const removeCurrentMeal = async (userId:string, mealId: number) => {
  try{
    const currentMealsRef = ref(db, `currentMeals/${userId}/${mealId}`)
    await remove(currentMealsRef);
    console.info(`meal with id of ${mealId} was removed from the current meals`);
  }catch(error) {
    console.error(`error removing current meal: ${error}`);
    throw error;
  }

}