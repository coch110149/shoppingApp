import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { addMeal, editMeal, fetchMeals } from '../firebaseService'
import { useHistory, useLocation } from "react-router-dom";
import { Meal } from './MealList'

interface AddEditPageProps {
    updateMealList: () => void;
}

const AddEditPage: React.FC<AddEditPageProps> = ({ updateMealList }) => {
    const [mealId, setMealId] = useState<number>(-1)
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [servings, setServings] = useState('');
    const [mealCost, setMealCost] = useState('');
    const [pricePerServing, setPricePerServing] = useState('');
    const [directions, setDirections] = useState('');
    const [mode, setMode] = useState<'add' | 'edit'>('add');

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { meal: Meal };
        if (state && state.meal) {
            const meal: Meal = state.meal;
            setName(meal.name || '');
            setIngredients(meal.ingredients || '');
            setServings(meal.servings || '');
            setMealCost(meal.cost || '');
            setDirections(meal.directions)
            setMealId(meal.id || -1)
            setMode('edit');
        }
    }, [location.state]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const mealData = {
            id: mealId,
            name: name,
            ingredients: ingredients,
            servings: servings,
            cost: mealCost,
            directions: directions
        };

        try {
            if (mode === 'add') {
                await addMeal(mealData);
            } else if (mode === 'edit') {
                const state = location.state as { meal: Meal };
                const meal: Meal = state.meal;
                await editMeal({ ...meal, ...mealData })
            }
            history.push("/meals");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle> Add/Edit Recipie</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={handleFormSubmit}>

                    <IonInput label="name" type="text" value={name} onIonChange={(e) => setName(e.detail.value!)}
                        required
                    />

                    <IonItem>
                        <IonTextarea
                            label="Ingredients"
                            value={ingredients}
                            onIonChange={(e) => setIngredients(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonInput
                            label="Number of Servings"
                            type="number"
                            value={servings}
                            onIonChange={(e) => setServings(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Cost"
                            type="number"
                            value={mealCost}
                            onIonChange={(e) => setMealCost(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Price per Serving"
                            type="number"
                            value={pricePerServing}
                            onIonChange={(e) => setPricePerServing(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonTextarea
                            label="Directions"
                            value={directions}
                            onIonChange={(e) => setDirections(e.detail.value!)}
                        />
                    </IonItem>

                    {/* Add an image upload component here */}
                    <IonButton expand="full" type="submit">Save</IonButton>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default AddEditPage;