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

        <div className="menuItem bg-orange-50 m-7 p-2 border-red-500 border-2 rounded-lg shadow-lg">
            <Card name={props.name} category={props.category}>
                <div className="p-2">
                    <div className='flex flex-row items-center justify-between'>
                    <h2 className="text-2xl font-bold text-gray-900 ">{props.name}</h2>
                    <h2 className="text-2xl font-semibold text-red-800">{props.price}<span>€</span></h2>
                    </div>
                    <p className="text-gray-700 text-sm ml-20">{props.ingredients.map(ingredient => ingredient.toUpperCase()).join(', ')}</p>
                    {props.allergens && props.allergens.length > 0 && (
                        <div className="">
                            <p className="allergens text-sm ml-20 text-red-600">Allergens: {props.allergens.join(', ')}</p>
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