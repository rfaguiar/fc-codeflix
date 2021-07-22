import * as React from 'react';
import {useEffect, useState} from 'react';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import categoryHttp from "../../util/http/category-http";
import {BadgeNo, BadgeYes} from "../../components/Badge";
import {Category, ListResponse} from "../../util/models";
import DefaultTable, {TableColumn} from '../../components/Table';

const columnsDefinition: TableColumn[] = [
    {
        name: 'id',
        label: 'ID',
        width: '30%',
        options: {
            sort: false
        }
    },
    {
        name: "name",
        label: "Nome",
        width: '43%',
    },
    {
        name: "is_active",
        label: "Ativo?",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value ? <BadgeYes /> : <BadgeNo />;
            }
        },
        width: '4%',
    },
    {
        name: "created_at",
        label: "Criado em",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>;
            }
        },
        width: '10%',
    },
    {
        name: "actions",
        label: "Ações",
        width: '13%'
    }
];

const Table = () => {
    const [data, setData] = useState<Category[]>([]);
    useEffect(() => {
        (async function getCategories() {
            const {data} = await categoryHttp.list<ListResponse<Category>>();
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