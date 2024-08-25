import {  type HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { IPost, ICategory, IStatus, Nullable, IUser } from "../../interfaces";
import { FormControlLabel, FormLabel } from "@mui/material";

export const UsersEdit: React.FC = () => {

  const {
    saveButtonProps,
    refineCore: { query: queryResult },
    register,
    control,
    formState: { errors },
  } = useForm<IUser, HttpError, Nullable<IUser>>();


  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >




<TextField
          {...register("_id", {
            required: "This field is required",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
          disabled
          style={{display: "none"}}
          fullWidth
          label="Id"
          name="_id"
          autoFocus
          InputLabelProps={{ shrink: true }}  
        />
    
    
        <TextField
          {...register("username", {
            required: "This field is required",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}  
          label="Username"
          name="username"
          autoFocus
        />
    

    <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}  
          label="Email"
          name="email"
          autoFocus

          />
      </Box>
    </Edit>
  );
};
