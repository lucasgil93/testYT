import React from 'react';
import { Card } from 'primereact/card';



export default function MenuItem(props) {

    return (

        <div className="menuItem bg-orange-50 m-7 p-2 border-red-500 border-2 rounded-lg shadow-lg">
            <Card name={props.name} category={props.category}>
                <div className="p-2">
                    <div className='flex flex-row items-center justify-between'>
                        <h2 className="text-2xl font-bold text-gray-900 ">{props.name}</h2>
                        <h2 className="text-2xl font-semibold text-gray-900">{props.price}<span>€</span></h2>
                    </div>
                    <p className="text-gray-700 text-sm ml-20">{props.ingredients.map(ingredient => ingredient.toUpperCase()).join(', ')}</p>
                    {props.allergens && props.allergens.length > 0 && (
                        <div className="">
                            <p className="allergens text-sm ml-20 text-red-500">Allergens: {props.allergens.join(', ')}</p>
                        </div>

                    )}
                </div>
            </Card>
        </div>
    );

}