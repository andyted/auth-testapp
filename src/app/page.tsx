"use client";
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios, { AxiosResponse } from "axios";

import { useSession, getSession, signIn, signOut } from "next-auth/react";

type Inputs = {
  fullName: string;
};

export default function Page() {

  const { data: session, status } = useSession()
  

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: "",
    },
  });

  const [banner,setBanner] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    const session = await getSession();

    console.log(session.accessToken);

    const config = {
      headers: { Authorization: `Bearer ${session.accessToken}` }
    };

    const response = await axios
      .post(
        "http://localhost:8080/greeting",
        data,config
        )
      .then(function (response) {
        console.log(response);
        setBanner(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  console.log(watch("fullName")); // watch input value by passing the name of it

  if (status === "loading") {
    return <p>Hang on there...</p>
  }
  
  if (status === "authenticated") {
    return (
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <button onClick={() => signOut()}>Sign out</button>
          </Grid>
          <Grid item xs={12}>
            <h1>Auth Test App</h1>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid>
            <Typography variant="h2">
              {banner}
            </Typography>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn("keycloak")}>Sign in</button>
    </>
  )
}
