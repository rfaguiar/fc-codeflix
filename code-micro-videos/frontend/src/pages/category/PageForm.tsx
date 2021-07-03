import * as React from 'react';
import { useParams } from 'react-router-dom';
import {Page} from "../../components/Page";
import {Form} from "./Form";

const PageForm = () => {
    // @ts-ignore
    const {id} = useParams();
    return (
        <Page title={!id ? 'Criar categoria': 'Editar categoria'}>
            <Form/>
        </Page>
    );
};

export default PageForm;