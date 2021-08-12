import * as React from 'react';
import {useEffect, useState} from 'react';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import genreHttp from "../../util/http/genre-http";
import {Genre, ListResponse} from "../../util/models";
import DefaultTable, {makeActionStyles, TableColumn} from '../../components/Table';
import {IconButton, MuiThemeProvider} from "@material-ui/core";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {BadgeNo, BadgeYes} from "../../components/Badge";

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
        width: '23%'
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
        name: "categories",
        label: "Categorias",
        width: '20%',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return value.map(value => value.name).join(', ');
            }
        }
    },
    {
        name: "created_at",
        label: "Criado em",
        width: '10%',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>;
            }
        }
    },
    {
        name: "actions",
        label: "Ações",
        width: '13%',
        options: {
            sort: false,
            customBodyRender(value, tableMeta, updateValue) {
                return (
                    <IconButton
                        color={'secondary'}
                        component={Link}
                        to={`/cast-members/${tableMeta.rowData[0]}/edit`}
                    >
                        <EditIcon/>

                    </IconButton>
                )
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
        <MuiThemeProvider theme={makeActionStyles(columnsDefinition.length - 1)}>
            <DefaultTable
                columns={columnsDefinition}
                data={data}
                title={""}
            />
        </MuiThemeProvider>
    );
};

export default Table;