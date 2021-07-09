import * as React from 'react';
import {useEffect, useState} from 'react';
import {MUIDataTableColumn} from "mui-datatables";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import castMemberHttp from "../../util/http/cast-member-http";
import {CastMember, ListResponse} from "../../util/models";
import DefaultTable from '../../components/Table';

const CastMemberTypeMap = {
    1: 'Diretor',
    2: 'Ator'
};

const columnsDefinition: MUIDataTableColumn[] = [
    {
        name: "name",
        label: "Nome"
    },
    {
        name: "type",
        label: "Tipo",
        options: {
            customBodyRender(value, tableMeta, updateValue) {
                return CastMemberTypeMap[value];
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
    const [data, setData] = useState<CastMember[]>([]);
    useEffect(() => {
        (async function getData() {
            const {data} = await castMemberHttp.list<ListResponse<CastMember>>();
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