import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { addMeal, fetchMeals } from '../firebaseService'
import { useHistory } from "react-router-dom";
import {Meal} from './MealList'

interface AddEditPageProps {
    updateMealList: () => void;
}

const AddEditPage: React.FC<AddEditPageProps> = ({updateMealList}) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [servings, setServings] = useState('');
    const [mealCost, setMealCost] = useState('');
    const [pricePerServing, setPricePerServing] = useState('');
    const [directions, setDirections] = useState('');

    const history = useHistory();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const mealData = {
            name: name,
            ingredients: ingredients,
            servings: servings,
            mealCost: mealCost,
            directions: directions
        };
        
        try {
            await addMeal(mealData);
            history.push("/meals");
            
        }catch(error){
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
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput type="text" value={name} onIonChange={(e) => setName(e.detail.value!)}
                        required
                    />

                    <IonItem>
                        <IonLabel position="stacked">Ingredients</IonLabel>
                        <IonTextarea
                            value={ingredients}
                            onIonChange={(e) => setIngredients(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Number of Servings</IonLabel>
                        <IonInput
                            type="number"
                            value={servings}
                            onIonChange={(e) => setServings(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Cost</IonLabel>
                        <IonInput
                            type="number"
                            value={mealCost}
                            onIonChange={(e) => setMealCost(e.detail.value!)}
                        ></IonInput></IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Price per Serving</IonLabel>
                        <IonInput
                            type="number"
                            value={pricePerServing}
                            onIonChange={(e) => setPricePerServing(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Directions</IonLabel>
                        <IonTextarea
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