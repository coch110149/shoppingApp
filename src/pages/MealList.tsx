import { IonAlert, IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { add, cart, pencil, trash } from "ionicons/icons";
import { addCurrentMeals, addMeal, deleteMeal, fetchCurrentMeals, fetchMeals } from '../firebaseService';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"


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
    const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
    const [currentUser, setCurentUser] = useState<any>();



    const fetchMealsFromDataBase = async () => {
        const fetchedMeals = await fetchMeals();
        if (fetchedMeals) {
            const mealsArray = Object.values(fetchedMeals);
            setMeals(mealsArray);

            //Fetch the current meals here and mark them in the meal list

            const currentMeals = await fetchCurrentMeals(currentUser.id);
            if (currentMeals) {
                const currentMealIds = Object.values(currentMeals);
                setCurrentMeals(currentMealIds);
            };
        }
    };

    useEffect(() => {
        fetchMealsFromDataBase();

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurentUser(user);
                console.log("User")
            }
        })
        const userID = currentUser ? currentUser.uid : null;
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

    const handleAddToCurrentMeals = () => {
        const selectedMeals = meals.filter((meal) => selectedItems.includes(meal.id));
        const newCurrentMeals = Array.from(new Set([...currentMeals, ...selectedMeals]));
        setCurrentMeals(newCurrentMeals);
        setSelectedItems([]);
        console.log(newCurrentMeals);
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
            setSelectedItems(selectedItems.filter(id => id !== mealId));
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

    const openShoppingList = () => {
        addCurrentMeals(currentUser.id, currentMeals, null)
        history.push("/shoppingList", { selectedMeals: currentMeals });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Meal List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={openShoppingList}>
                            <IonIcon icon={cart} />
                        </IonButton>
                    </IonButtons>
                    {selectedItems.length > 0 && (
                        <IonButton onClick={handleAddToCurrentMeals}>Add To Shopping List</IonButton>
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