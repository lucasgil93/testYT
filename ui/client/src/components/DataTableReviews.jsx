import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const API_URL = "http://localhost:5038/";

export default function DataTableReviews() {
    const [reviews, setReviews] = useState(null);

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Name' },
        { field: 'text', header: 'Review' },
        { field: 'rating', header: 'Rating' },
        { field: 'created', header: "Date of Creation" }
    ];

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(API_URL + 'api/project/GetReviews');
                const responseData = await response.json();
                setReviews(responseData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
    }, []);

    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) return false;
        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        const { rowData, newValue, field, originalEvent: event } = e;

        if (field === 'rating') {
            if (isPositiveInteger(newValue)) rowData[field] = newValue;
            else event.preventDefault();
        } else {
            if (newValue.trim().length > 0) rowData[field] = newValue;
            else event.preventDefault();
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'rating') return ratingEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    const ratingEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="decimal" min={0} max={5} onKeyDown={(e) => e.stopPropagation()} />;
    };

    return (
        <div className="card p-fluid m-4 text-center">
            <DataTable value={reviews} editMode="cell" className='bg-slate-200 border-black border-2 text-center' tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => (
                    <Column
                        key={field}
                        field={field}
                        header={header}
                        editor={(options) => cellEditor(options)}
                        onCellEditComplete={onCellEditComplete}
                        className='bg-yellow-100 border-black border-2 width-fit'
                    />
                ))}
            </DataTable>
        </div>
    );
}
