import { IonCheckbox, IonItem, IonLabel, IonList } from "@ionic/react"
import { Meal } from "./MealList";
import { useLocation } from "react-router";

interface ShoppingListProps {
    selectedMeals: Meal[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({}) => {
    const location = useLocation();
  const selectedMeals: Meal[] = (location.state as {selectedMeals?: Meal[] })?.selectedMeals || [];

    console.log(selectedMeals)
    return (
        <IonList>
            {selectedMeals.map((meal: Meal) => (
                <IonItem key={meal.id}>

                    <IonLabel>
                        <h2>{meal.name}</h2>
                        <p>This will make {meal.servings} servings</p>
                        <p>Its gonna cost around {meal.cost}</p>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

export default ShoppingList;