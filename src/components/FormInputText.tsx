import { Control, Controller, InputValidationRules } from "react-hook-form";
import TextField from "@mui/material/TextField";

export default function FormInputText ({ name, type, control, label, rules, def,}:{name:string, type?:string,control:any,label:string,rules:any,def:string}) {
    return (
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              type={type??" "}
              onChange={onChange}
              value={value}
              fullWidth
              label={label}
              variant="outlined"
            />
          )}
          rules={rules}
          defaultValue={def}
        />
      );
};