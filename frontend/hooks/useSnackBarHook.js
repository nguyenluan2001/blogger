import { useSnackbar } from 'notistack';
const useSnackBarHook = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const openSnackSuccess = ({title}) => {
        return enqueueSnackbar(title, {
            variant:"success"
        })
    }
    const openSnackError = ({title}) => {
        return enqueueSnackbar(title, {
            variant: "error"
        })
    }
    return {openSnackSuccess, openSnackError}
}
export {useSnackBarHook};