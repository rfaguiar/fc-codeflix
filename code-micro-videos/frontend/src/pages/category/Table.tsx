import * as React from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import {useEffect, useState} from "react";
import {httpVideo} from "../../util/http";

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "is_active",
        label: "Ativo?"
    },
    {
        name: "created_at",
        label: "Criado em"
    }
];

type Props = {

};
const Table = (props: Props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        httpVideo.get('categories')
            .then(response => setData(response.data.data));
    }, []);

    return (
        <div>
            <MUIDataTable
                columns={columnsDefinition}
                data={data}
                title={"Listagem de categorias"}
            />
        </div>
    );
};

export default Table;