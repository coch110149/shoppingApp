import React from 'react';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet } from '@ionic/react';
import { list, cart } from 'ionicons/icons';
import { Route } from 'react-router-dom';
import MealList, { Meal } from './MealList';
import ShoppingList from './ShoppingList';

interface BottomNavigationProps {
  selectedMeals: Meal[];
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ selectedMeals }) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/meals" component={MealList} exact />
        <Route path="/shoppingList" render={() => <ShoppingList selectedMeals={selectedMeals} />} exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="mealList" href="/meals">
          <IonIcon icon={list} />
          <IonLabel>Meal List</IonLabel>
        </IonTabButton>
        <IonTabButton tab="shoppingList" href="/shoppingList">
          <IonIcon icon={cart} />
          <IonLabel>Shopping List</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default BottomNavigation;
