import {EnqueueSnackbar, useSnackbar, OptionsObject} from "notistack";

export class Message {
    private readonly enqueueSnackbar:  EnqueueSnackbar
    private options:OptionsObject  = {
        anchorOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        autoHideDuration: 3000
    }
    constructor() {
        const {enqueueSnackbar} = useSnackbar()
        this.enqueueSnackbar = enqueueSnackbar
    }
    info(message: string) {
        this.enqueueSnackbar(message,{variant: "info",...this.options})
    }
    success(message: string) {
        this.enqueueSnackbar(message,{variant: "success",...this.options})
    }
    error(message: string) {
        this.enqueueSnackbar(message,{variant: "error",...this.options})
    }
    primary(message: string) {
        this.enqueueSnackbar(message,{variant: "default",...this.options})
    }
    warn(message: string) {
        this.enqueueSnackbar(message,{variant: "warning",...this.options})
    }

}