import * as React from 'react';
import {useEffect, useState} from 'react';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import genreHttp from "../../util/http/genre-http";
import {Genre, ListResponse} from "../../util/models";
import DefaultTable, {TableColumn} from '../../components/Table';

const columnsDefinition: TableColumn[] = [
    {
        name: 'id',
        label: 'ID',
        width: '33%',
        options: {
            sort: false
        }
    },
    {
        name: "name",
        label: "Nome",
        width: '50%'
    },
    {
        name: "categories",
        label: "Categorias",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value.map(value => value.name).join(', ');
            }
        }
    },
    {
        name: "created_at",
        label: "Criado em",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>;
            }
        }
    }
];

const Table = () => {
    const [data, setData] = useState<Genre[]>([]);
    useEffect(() => {
        (async function getGenre() {
            const {data} = await genreHttp.list<ListResponse<Genre>>();
            setData(data.data);
        })();
    }, []);

    return (
        <DefaultTable
            columns={columnsDefinition}
            data={data}
            title={""}
        />
    );
};

export default Table;