import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { add } from "ionicons/icons";
import { addMeal, fetchMeals } from '../firebaseService';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddEditPage from "./AddEditPage";


export interface Meal {
    id: number;
    name: string;
    numIngredients: number;
    timeToComplete: number;
}

const MealList: React.FC = () => {
    const history = useHistory();
    const [meals, setMeals] = useState<Meal[]>([]);

    const fetchMealsFromDataBase = async () => {
        const fetchedMeals = await fetchMeals();
        console.log(fetchedMeals)
        if (fetchedMeals) {
            const mealsArray = Object.values(fetchedMeals);
            setMeals(mealsArray);
            console.log(mealsArray)
        }
    };

    useEffect(() => {
        fetchMealsFromDataBase();
    }, []);

    const handleAddMeal = () => {
        history.push("/meals/add")
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
                    {meals.map((meal: Meal) => (
                        <IonItem key={meal.id}>
                            <IonLabel>
                                <h2>{meal.name}</h2>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={handleAddMeal}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}

export default MealList;