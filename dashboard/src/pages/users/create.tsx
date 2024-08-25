import type { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { IPost, ICategory, IStatus, Nullable, IUser } from "../../interfaces";

export const UsersCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IUser, HttpError, Nullable<IUser>>();

  const { autocompleteProps } = useAutocomplete<ICategory>({
    resource: "users",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("username", {
            required: "This field is required",
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
          fullWidth
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
          label="Email"
          name="email"
          autoFocus

          />
      </Box>
    </Create>
  );
};
