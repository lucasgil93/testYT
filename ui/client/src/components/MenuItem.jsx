import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';



export default function MenuItem(props) {
    /* const footer = (
         <>
             <Button className="saveCardGame" label="Save" icon="pi pi-check" />
             <Button className='cancelCardGame' label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
         </>
     );
 ^*/
    return (

        <div className="menuItem flex justify-start items-left bg-orange-50 m-7 p-4 rounded-lg shadow-lg">
            <Card name={props.name} category={props.category}>
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{props.name}</h2>
                    <p className="text-gray-700 text-xl mb-4">{props.ingredients.map(ingredient => ingredient.toUpperCase()).join(', ')}</p>
                    <h2 className="text-2xl font-semibold text-gray-800">{props.price}<span>€</span></h2>
                    {props.allergens && props.allergens.length > 0 && (
                        <div className="mt-4">
                            <p className="allergens text-md text-red-600">Allergens: {props.allergens.join(', ')}</p>
                        </div>

                    )}
                    {props.logged && (<button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(meal)}
                    >
                        Add to Cart
                    </button>)}
                </div>
            </Card>
        </div>
    );

}