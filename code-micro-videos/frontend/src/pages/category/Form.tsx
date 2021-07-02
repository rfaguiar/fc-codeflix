import * as React from 'react';
import {Box, Button, ButtonProps, Checkbox, makeStyles, TextField} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import useForm from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import * as yup from "yup";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
});

const validationSchema = yup.object().shape({
    name: yup.string().label('Nome').required(),
});

export const Form = () => {

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        color: 'secondary',
        variant: "contained",
        className: classes.submit
    };

    const {register, getValues, handleSubmit, errors} = useForm({
        defaultValues: {
            is_active: true
        }
    });

    function onSubmit(formData, event) {
        categoryHttp.create(formData)
            .then(response => console.log(response));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name={'name'}
                label={'Nome'}
                fullWidth
                variant={'outlined'}
                inputRef={register({
                    required: 'O campo nome é requerido',
                    maxLength: {
                        value: 2,
                        message: 'O máximo caracteres é 2'
                    }}
                )}
                error={errors.name !== undefined}
                helperText={errors.name && errors.name.message}
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
            />
            <Checkbox
                name={'is_active'}
                defaultChecked
                inputRef={register}
                color={'primary'}
            />
            Ativo?
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