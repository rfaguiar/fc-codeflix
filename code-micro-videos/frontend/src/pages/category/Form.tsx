import * as React from 'react';
import {Box, Button, ButtonProps, Checkbox, FormControlLabel, makeStyles, TextField} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import useForm from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import * as yup from "../../util/vendor/yup";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
});

const validationSchema = yup.object().shape({
    name: yup.string()
        .label('Nome')
        .required()
        .max(255),
});

export const Form = () => {

    const classes = useStyles();

    const {register, getValues, setValue, handleSubmit, errors, reset, watch} = useForm({
        validationSchema,
        defaultValues: {
            is_active: true
        }
    });

    // @ts-ignore
    const {id} = useParams();
    const [category, setCategory] = useState<{id: string} | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const buttonProps: ButtonProps = {
        color: 'secondary',
        variant: "contained",
        className: classes.submit,
        disabled: loading
    };

    useEffect(() => {
        register({name: "is_active"});
    }, [register])

    useEffect(() => {
        if (!id) {
            return;
        }

        setLoading(true);

        categoryHttp.get(id)
            .then(({data}) => {
                setCategory(data.data);
                reset(data.data);
            })
            .finally(() => setLoading(false));
    }, [id, reset]);

    function onSubmit(formData, event) {
        setLoading(true);
        const http = !category
            ? categoryHttp.create(formData)
            : categoryHttp.update(category.id, formData);

        http.then(response => console.log(response))
            .finally(() => setLoading(false));
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
            <Box dir={'rtl'}>
                <Button
                    color={'primary'}
                    {...buttonProps}
                    onClick={() => onSubmit(getValues(), null)}
                >
                    Salvar
                </Button>
                <Button {...buttonProps} type={'submit'} >Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};