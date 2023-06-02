import { IonAlert, IonButton, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { add, pencil, trash } from "ionicons/icons";
import { addMeal, deleteMeal, fetchMeals } from '../firebaseService';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddEditPage from "./AddEditPage";


export interface Meal {
    id: number;
    name: string;
    ingredients: string;
    servings: string;
    cost: string;
    directions: string;
}

const MealList: React.FC = () => {
    const history = useHistory();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [expandedItems, setExpandedItems] = useState<number[]>([]);
    const [cookingList, setCookingList] = useState<Meal[]>([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);

    const fetchMealsFromDataBase = async () => {
        const fetchedMeals = await fetchMeals();
        if (fetchedMeals) {
            const mealsArray = Object.values(fetchedMeals);
            setMeals(mealsArray);
        }
    };

    useEffect(() => {
        fetchMealsFromDataBase();
    }, []);

    const handleAddMeal = () => {
        history.push("/meals/add")
    };

    const handleItemExpansion = (mealId: number) => {
        if (expandedItems.includes(mealId)) {
            setExpandedItems(expandedItems.filter(id => id !== mealId));
        } else {
            setExpandedItems([...expandedItems, mealId]);
        }
    };

    const handleAddToCookingList = () => {
        const selectedMeals = meals.filter((meal) => selectedItems.includes(meal.id));
        setCookingList([...cookingList, ...selectedMeals]);
        setSelectedItems([]);
    };

    const handleEditMeal = (meal: Meal) => {
        history.push({
            pathname: "/meals/edit",
            state: { meal },
        });
    };

    const handleDeleteMeal = (mealId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        const meal = meals.find((meal) => meal.id === mealId);
        if (meal) {
            setMealToDelete(meal);
            setShowDeleteAlert(true);
        }
    };

    const handleCheckboxChange = (mealId: number) => {
        if (selectedItems.includes(mealId)) {
            setSelectedItems(selectedItems.filter(id => id != mealId));
        } else {
            setSelectedItems([...selectedItems, mealId]);
        }
    };

    const handleConfirmDelete = async () => {
        if (mealToDelete) {
            await deleteMeal(mealToDelete.id);
            setMeals(meals.filter((meal) => meal.id != mealToDelete.id));
        }
        setShowDeleteAlert(false);
    };

    const handleCancelDelete = () => {
        setMealToDelete(null);
        setShowDeleteAlert(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Meal List</IonTitle>
                    {selectedItems.length > 0 && (
                        <IonButton onClick={handleAddToCookingList}>Add To Shopping List</IonButton>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {meals.map((meal: Meal) => (
                        <IonItem key={meal.id} onClick={() => handleItemExpansion(meal.id)}>
                            <IonCheckbox
                                slot="start"
                                checked={selectedItems.includes(meal.id)}
                                onIonChange={() => { handleCheckboxChange(meal.id) }}
                                onClick={(event) => event.stopPropagation()}
                                aria-label=""
                            />
                            <IonLabel>
                                <h2>{meal.name}</h2>
                                <p>This will make {meal.servings} servings</p>
                                <p>Its gonna cost around {meal.cost}</p>
                            </IonLabel>
                            <IonIcon icon={pencil} onClick={(event) => { event.stopPropagation(); handleEditMeal(meal) }} />
                            <IonIcon icon={trash} onClick={(event) => { handleDeleteMeal(meal.id, event) }} />
                        </IonItem>
                    ))}
                </IonList>

                <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginBottom: '80px' }}>
                    <IonFabButton onClick={handleAddMeal}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={handleCancelDelete}
                    header="Confirm Delete"
                    message={`Are you sure you want to delete ${mealToDelete?.name}?`}
                    buttons={[
                        {
                            text: "Cancel",
                            role: "cancel",
                            handler: handleCancelDelete
                        },
                        {
                            text: "Delete",
                            handler: handleConfirmDelete
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    )
}

export default MealList;