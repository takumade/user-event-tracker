import {  type HttpError } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { IPost, ICategory, IStatus, Nullable, IUser, IEvent } from "../../interfaces";
import { FormControlLabel, FormLabel } from "@mui/material";

export const EventsEdit: React.FC = () => {

  const {
    saveButtonProps,
    refineCore: { query: queryResult },
    register,
    control,
    formState: { errors },
  } = useForm<IEvent, HttpError, Nullable<IEvent>>();


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
          error={!!errors._id}
          helperText={errors._id?.message}
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
          {...register("userId", {
            required: "This field is required",
          })}
          error={!!errors.userId}
          helperText={errors.userId?.message}
          margin="normal"
          fullWidth
          label="User Id"
          name="userId"
          autoFocus
          InputLabelProps={{ shrink: true }}  
        />
    



<TextField
          {...register("event_type", {
            required: "This field is required",
          })}
          error={!!errors.event_type}
          helperText={errors.event_type?.message}
          margin="normal"
          disabled
          style={{display: "none"}}
          fullWidth
          label="Event Type"
          name="event_type"
          autoFocus
          InputLabelProps={{ shrink: true }}  
        />


<TextField
          {...register("description", {
            required: "This field is required",
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          disabled
          style={{display: "none"}}
          fullWidth
          label="Description"
          name="description"
          autoFocus
          InputLabelProps={{ shrink: true }}  
        />

<TextField
          {...register("duration", {
            required: "This field is required",
          })}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          margin="normal"
          disabled
          style={{display: "none"}}
          fullWidth
          label="Duration"
          name="duration"
          autoFocus
          InputLabelProps={{ shrink: true }}  
        />
    
    
       
    

      </Box>
    </Edit>
  );
};
