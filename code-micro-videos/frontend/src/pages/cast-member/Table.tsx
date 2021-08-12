import * as React from 'react';
import {useEffect, useState} from 'react';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import castMemberHttp from "../../util/http/cast-member-http";
import {CastMember, ListResponse} from "../../util/models";
import DefaultTable, {makeActionStyles, TableColumn} from '../../components/Table';
import {IconButton, MuiThemeProvider} from "@material-ui/core";
import {Link} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const CastMemberTypeMap = {
    1: 'Diretor',
    2: 'Ator'
};

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
        width: '40%',
    },
    {
        name: "type",
        label: "Tipo",
        width: '7%',
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return CastMemberTypeMap[value];
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
    const [data, setData] = useState<CastMember[]>([]);
    useEffect(() => {
        (async function getData() {
            const {data} = await castMemberHttp.list<ListResponse<CastMember>>();
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