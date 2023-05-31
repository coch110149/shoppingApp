import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { add } from "ionicons/icons";

const dummyMealData = [
    { id: 1, title: 'Spaghetti Bolognese', numIngredients: 7, timeToComplete: 40 },
    { id: 2, title: 'Chicken Stir Fry', numIngredients: 6, timeToComplete: 25 },
    { id: 3, title: 'Veggie Pizza', numIngredients: 9, timeToComplete: 35 },
    { id: 4, title: 'Grilled Salmon', numIngredients: 4, timeToComplete: 20 },
    { id: 5, title: 'Beef Tacos', numIngredients: 5, timeToComplete: 30 },
  ];

const MealList = () => {
    console.log("here")
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Meal List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {dummyMealData.map((meal) => (
                        <IonItem key={meal.id}>
                            <IonLabel>
                                <h2>{meal.title}</h2>
                                <p>{`${meal.numIngredients} ingredients | ${meal.timeToComplete} mins`}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink="/meals/add">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
}

export default MealList;