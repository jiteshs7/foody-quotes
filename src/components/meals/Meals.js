import React from 'react';
import MealAvailability from './mealAvailability/MealAvailability';
import MealSummary from './mealSummary/MealSummary';

function Meals(props) {
    return (
       <>
        <MealSummary/>
        <MealAvailability/>
       </>
    );
}

export default Meals;