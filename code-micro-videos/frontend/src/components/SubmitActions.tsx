// @flow
import * as React from 'react';
import {Box, Button, ButtonProps, makeStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";

interface SubmitActionsProps {
    disableButtons?: boolean;
    handleSave: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        submit: {
            margin: theme.spacing(1)
        }
    }
});

const SubmitActions: React.FC<SubmitActionsProps> = (props) => {
    const classes = useStyles();
    const buttonProps: ButtonProps = {
        color: 'secondary',
        variant: "contained",
        className: classes.submit,
        disabled: props.disableButtons === undefined ? false : props.disableButtons
    };
    return (
        <Box dir={'rtl'}>
            <Button
                color={'primary'}
                {...buttonProps}
                onClick={props.handleSave}
            >
                Salvar
            </Button>
            <Button {...buttonProps} type={'submit'} >Salvar e continuar editando</Button>
        </Box>
    );
};

export default SubmitActions;