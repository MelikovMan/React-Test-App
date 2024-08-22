import { useForm } from "react-hook-form"
//import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import logo from '../logo.svg';
import { Button, Paper, Typography, Alert, LinearProgress } from "@mui/material";
import FormInputText from "../components/FormInputText";
import { useAppSelector } from "../state/hooks";
import { LoginRequest, useLoginMutation } from "../api/usersApi";
import { TokenStatus } from "../state/authSlice";
import { isErrorWithMessage, isFetchBaseQueryErrorNested } from "../api/helpers";

export default function LoginPage() {
    const {
      register,
      handleSubmit,
      watch,
      control,
      reset,
      formState: { errors },
    } = useForm<LoginRequest>({
        defaultValues: {
            email: localStorage.getItem("email") ?? "",
            password:"",
          },
    });
    const {token,
        status,
        error}= useAppSelector(state=>state.authSlice);
    useEffect(()=>
    {if(token) navigate("/profiles")},[token])
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const onSubmit = async (data:LoginRequest) => {
        try {
            await login(data);   
        }
        catch (err) {

        }
        
    }
    const defValues: LoginRequest = useMemo(()=>{
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
        <Typography variant="h2"> Вход </Typography>
        {status === TokenStatus.ERROR && <Alert severity="error">Ошибка входа в систему {error}</Alert>}
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
          rules={{required: 'Поле обязательно'}}
          def={defValues.password} />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"} disabled={status === TokenStatus.FETCHING}>
          Войти
        </Button>
        <Button onClick={()=>{navigate("/register");}}>
          Зарегестрироваться
        </Button>
        {status === TokenStatus.FETCHING && <LinearProgress />}
      </Paper>
    </div>
    )
  }