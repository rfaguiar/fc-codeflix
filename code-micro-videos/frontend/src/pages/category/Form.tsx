import * as React from 'react';
import {Box, Button, ButtonProps, Checkbox, makeStyles, TextField} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
});

export const Form = () => {

    const classes = useStyles();

    const buttonProps: ButtonProps = {
        variant: "outlined",
        className: classes.submit
    };

    return (
        <form>
            <TextField
                name={'name'}
                label={'Nome'}
                fullWidth
                variant={'outlined'}
            />
            <TextField
                name={'description'}
                label={'Descrição'}
                multiline
                rows={'4'}
                fullWidth
                variant={'outlined'}
                margin={'normal'}
            />
            <Checkbox
                name={'is_active'}
            />
            Ativo?
            <Box dir={'rtl'}>
                <Button {...buttonProps} >Salvar</Button>
                <Button {...buttonProps} type={'submit'} >Salvar e continuar editando</Button>
            </Box>
        </form>
    );
};