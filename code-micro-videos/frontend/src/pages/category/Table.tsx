import * as React from 'react';
import {useEffect, useState} from 'react';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import categoryHttp from "../../util/http/category-http";
import {BadgeNo, BadgeYes} from "../../components/Badge";
import {Category, ListResponse} from "../../util/models";
import DefaultTable, {TableColumn} from '../../components/Table';
import {useSnackbar} from "notistack";

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
    const snackbar = useSnackbar();
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        let isSubscribed = true;
        (async function getCategories() {
            setLoading(true);
            try {
                const {data} = await categoryHttp.list<ListResponse<Category>>();
                if (isSubscribed) {
                    setData(data.data);
                }
            } catch (error) {
                console.error(error);
                snackbar.enqueueSnackbar('Não foi possível carregar as informações',
                    {variant: 'error'}
                )
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            isSubscribed = false;
        }
    }, []);

    return (
        <DefaultTable
            columns={columnsDefinition}
            data={data}
            title={""}
            loading={loading}
        />
    );
};

export default Table;