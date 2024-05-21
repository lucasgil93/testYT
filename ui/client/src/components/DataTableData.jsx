import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

//Component to show the data coming from props (database data) in a table manner for the employees and admins of the page to see it more clearly and easily

const API_URL = "http://localhost:5038/";

export default function DataTableData(props) {

    // Extracting fields from the data and filtering out "_id"
    const fields = props.data.length > 0 ? Object.keys(props.data[0]).filter(field => field !== "_id" && field !== "image") : [];

    // Mapping fields to columns
    const columns = fields.map(field => ({
        field: field,
        header: field.charAt(0).toUpperCase() + field.slice(1) // Capitalizing the first letter of field as header
    }));

    //Here we have the table with the data being fed to it and the columns iterate said data taking into account the header as titles of the datatable and fields for the data in each row.
    return (
        <div className="card p-fluid m-6 text-center">
            <DataTable value={props.data} editMode="cell" className='bg-slate-200 border-black border-2 text-center' tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => (
                    <Column
                        key={field}
                        field={field}
                        header={header}
                        className='bg-red-50 font-light border-black border-2'
                    />
                ))}

            </DataTable>
        </div>
    );
}
