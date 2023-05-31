import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { add } from "ionicons/icons";
import {addMeal, fetchMeals} from '../firebaseService';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


interface Meal {
    id: number;
    title: string;
    numIngredients: number;
    timeToComplete: number;
}

const MealList = () => {
    const history = useHistory();
    const [meals,setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchMealsFromDataBase = async () => {
            const fetchedMeals = await fetchMeals();
            if(fetchedMeals) {
                const mealsArray: Meal[] = Object.values(fetchedMeals);
                setMeals(mealsArray);
            }
        };

        fetchMealsFromDataBase();
    }, []);

    const handleAddMeal = () => {
        const newMeal = {};
        history.push("/meals/add")
        addMeal(newMeal);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Meal List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {meals.map((meal) => (
                        <IonItem key={meal.id}>
                            <IonLabel>
                                <h2>{meal.title}</h2>
                                <p>{`${meal.numIngredients} ingredients | ${meal.timeToComplete} mins`}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick ={handleAddMeal}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}

export default MealList;