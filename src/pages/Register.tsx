import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { RegisterRequest, useLoginMutation, userApi } from "../api/usersApi";
import LoginPage from "./LoginPage";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../state/hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { TokenStatus } from "../state/authSlice";
import FormInputText from "../components/FormInputText";
export default function Register(){
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm<RegisterRequest>({
          defaultValues: {
              email: localStorage.getItem("email") ?? "",
              password:"",
            },
      });
      const {token,
          status,
          error}= useAppSelector(state=>state.authSlice);
      useEffect(()=>
      {if(token) navigate("/profiles")},[token]);
      const navigate = useNavigate();
      const [login] = useLoginMutation();
      const [confirmPassword,setControlPassword]=useState<string>("");
      const onSubmit = async (data:RegisterRequest) => {
          try {
              await login(data);   
          }
          catch (err) {
  
          }
          
      }
      const defValues: RegisterRequest = useMemo(()=>{
        return {
          password:"",
          email: localStorage.getItem("email") ?? "",
        }
      }, [token])
      localStorage.setItem("email",watch("email"));
    
      return (
      <div className="login-wrapper">
        <Paper
          style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",
        }}
        >
          <Typography variant="h2"> Регистрация </Typography>
          {status === TokenStatus.ERROR && <Alert severity="error">Ошибка регистрации в систему {error}</Alert>}
          <FormInputText name="email"
            type="email" 
            control={control} 
            label="Электронная почта" 
            rules={{required: 'Поле обязательно'}}
            def={defValues.email} />
          <FormInputText name="password"
            type="password" 
            control={control} 
            label="Пароль"
            rules={{required: 'Поле обязательно', validate: (value:string) => value===confirmPassword ? true : 'Повторный пароль набран неправильно'}}
            def={defValues.password} />
          <TextField
              size="small"
              fullWidth
              type="password"
              variant="outlined"
              label="Подтвредите пароль"
              onChange={(event)=>setControlPassword(event.target.value)}
              value={confirmPassword}
              error={errors.password?.type === 'validate' ?? false}
              helperText={errors.password?.type === 'validate' ? errors.password.message: null}
            />
          <Button onClick={handleSubmit(onSubmit)} variant={"contained"} disabled={status === TokenStatus.FETCHING}>
            Зарегестрироваться
          </Button>
        </Paper>
      </div>
      )
}