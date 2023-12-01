"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

type Inputs = {
  message: string;
};

export default function Page() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({defaultValues: {
    message: "",
  }},);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("message")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}><h1>Auth Test App</h1></Grid>
        <Grid item xs={12}>
        <Controller
        name="message"
        control={control}
        render={({ field }) => <TextField {...field} id="outlined-basic" label="Message" variant="outlined" />}
      />
          
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
}
