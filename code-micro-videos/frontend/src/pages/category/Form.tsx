import * as React from 'react';
import {useEffect, useState} from 'react';
import {Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import useForm from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import * as yup from "../../util/vendor/yup";
import {useHistory, useParams} from "react-router";
import {useSnackbar} from "notistack";
import {Category} from "../../util/models";
import {AxiosResponse} from "axios";
import SubmitActions from "../../components/SubmitActions";


const validationSchema = yup.object().shape({
    name: yup.string()
        .label('Nome')
        .required()
        .max(255),
});

export const Form = () => {
    const {register, getValues, setValue, handleSubmit, errors, reset, watch, triggerValidation} = useForm({
        validationSchema,
        defaultValues: {
            is_active: true
        }
    });

    const snackbar = useSnackbar();
    const history = useHistory();
    // @ts-ignore
    const {id} = useParams();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        register({name: "is_active"});
    }, [register])

    useEffect(() => {
        if (!id) {
            return;
        }

        (async function getCategory() {
            setLoading(true);
            try {
                const {data} = await categoryHttp.get<AxiosResponse<Category>>(id);
                setCategory(data.data);
                reset(data.data);
            } catch (error) {
                console.error(error);
                snackbar.enqueueSnackbar('Não foi possível carregar as informações',
                    {variant: 'error'}
                )
            } finally {
                setLoading(false);
            }
        })();
    }, [id, reset]);

    async function onSubmit(formData, event) {
        setLoading(true);
        try {
            const http = !category
                ? categoryHttp.create(formData)
                : categoryHttp.update(category.id, formData);

            const {data} = await http;

            snackbar.enqueueSnackbar(
                'Categoria salva com sucesso',
                {variant: 'success'}
            )
            setTimeout(() => {
                if (event) {
                    id ? history.replace(`/categories/${data.data.id}/edit`)
                        : history.push(`/categories/${data.data.id}/edit`)
                } else {
                    history.push('/categories')
                }
            });
        } catch (error) {
            console.error(error);
            snackbar.enqueueSnackbar(
                'Não foi possível salvar a categoria',
                {variant: 'error'}
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name={'name'}
                label={'Nome'}
                fullWidth
                variant={'outlined'}
                inputRef={register}
                disabled={loading}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
                InputLabelProps={{shrink: true}}
            />
            <TextField
                name={'description'}
                label={'Descrição'}
                multiline
                rows={'4'}
                fullWidth
                variant={'outlined'}
                margin={'normal'}
                inputRef={register}
                disabled={loading}
                InputLabelProps={{shrink: true}}
            />
            <FormControlLabel
                disabled={loading}
                control={
                    <Checkbox
                        name="is_active"
                        color={'primary'}
                        onChange={
                            () => setValue('is_active', !getValues()['is_active'])
                        }
                        checked={Boolean(watch('is_active'))}
                    />
                }
                label={'Ativo?'}
                labelPlacement={'end'}
            />
            <SubmitActions
                disableButtons={loading}
                handleSave={() => triggerValidation().then(isValid => {
                        isValid && onSubmit(getValues(), null)
                    })
                }
            />
        </form>
    );
};