import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import useForm from "react-hook-form";
import castMemberHttp from "../../util/http/cast-member-http";
import * as yup from "../../util/vendor/yup";
import {useSnackbar} from "notistack";
import {useHistory, useParams} from "react-router";
import {CastMember} from "../../util/models";
import {AxiosResponse} from "axios";
import SubmitActions from "../../components/SubmitActions";
import DefaultForm from "../../components/DefaultForm";

const validationSchema = yup.object().shape({
    name: yup.string()
        .label('nome')
        .required()
        .max(255),
    type: yup.number()
        .label('Tipo')
        .required(),
});

export const Form = () => {

    const {register, getValues, setValue, handleSubmit, errors, reset, watch, triggerValidation} = useForm({
        validationSchema,
    });

    const snackbar = useSnackbar();
    const history = useHistory();
    // @ts-ignore
    const {id} = useParams();
    const [castMember, setCastMember] = useState<CastMember | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        register({name: "type"});
    }, [register])

    useEffect(() => {
        if (!id) {
            return;
        }

        (async function getCastMember() {
            setLoading(true);
            try {
                const {data} = await castMemberHttp.get<AxiosResponse<CastMember>>(id);
                setCastMember(data.data);
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
            const http = !castMember
                ? castMemberHttp.create(formData)
                : castMemberHttp.update(castMember.id, formData);

            const {data} = await http;

            snackbar.enqueueSnackbar(
                'Membro de elenco salvo com sucesso',
                {variant: 'success'}
            )
            setTimeout(() => {
                if (event) {
                    id ? history.replace(`/cast-members/${data.data.id}/edit`)
                        : history.push(`/cast-members/${data.data.id}/edit`)
                } else {
                    history.push('/cast-members')
                }
            });
        } catch (error) {
            console.error(error);
            snackbar.enqueueSnackbar(
                'Não foi possível salvar o membro de elenco',
                {variant: 'error'}
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <DefaultForm onSubmit={handleSubmit(onSubmit)}>
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
            <FormControl
                margin={'normal'}
                disabled={loading}
                error={errors.type !== undefined}
            >
                <FormLabel component={'legend'}>Tipo</FormLabel>
                <RadioGroup
                    name={'type'}
                    onChange={e => setValue('type', parseInt(e.target.value))}
                    value={String(watch('type'))}
                >
                    <FormControlLabel value={'1'} control={<Radio color={'primary'}/>} label={'Diretor'}/>
                    <FormControlLabel value={'2'} control={<Radio color={'primary'}/>} label={'Ator'}/>
                </RadioGroup>
                {
                    errors.type && <FormHelperText id={"type-helper-text"}>{errors.type.message}</FormHelperText>
                }
            </FormControl>
            <SubmitActions
                disableButtons={loading}
                handleSave={() => triggerValidation().then(isValid => {
                    isValid && onSubmit(getValues(), null)
                })
                }
            />
        </DefaultForm>
    );
};