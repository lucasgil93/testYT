import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import "../styles/CardGame.css";



export default function CardGame(props) {
    const header = (
        <img alt="Card" src={props.img} />
    );
   /* const footer = (
        <>
            <Button className="saveCardGame" label="Save" icon="pi pi-check" />
            <Button className='cancelCardGame' label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );
^*/
    return (
        <div className="card flex justify-content-center">
            <Card title={props.title} subTitle={props.subTitle} header={header} className="md:w-25rem">
                <p className="m-0">
                   {props.text}
                </p>
            </Card>
        </div>
    )
}

