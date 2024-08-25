import type { HttpError } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type { IPost, ICategory, IStatus, Nullable, IUser, IEvent } from "../../interfaces";

export const EventsCreate: React.FC = () => {
    const {
        saveButtonProps,
        register,
        control,
        formState: { errors },
    } = useForm<IEvent, HttpError, Nullable<IEvent>>();

    const { autocompleteProps } = useAutocomplete<IUser>({
        resource: "users",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >



                <Controller
                    control={control}
                    name="user"
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                        <Autocomplete<IUser>
                            id="user"
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    autocompleteProps?.options?.find(
                                        (p) => p?._id?.toString() === item?._id?.toString(),
                                    )?.username ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?._id?.toString() === (value?._id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="User Id"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors._id}
                                    helperText={errors._id?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />


                <TextField
                    {...register("event_type", {
                        required: "This field is required",
                    })}
                    error={!!errors.event_type}
                    helperText={errors.event_type?.message}
                    margin="normal"
                    fullWidth
                    label="Event Type"
                    name="event_type"
                    autoFocus

                />

                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    margin="normal"
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
                    type="number"
                    fullWidth
                    label="Duration"
                    name="duration"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    {...register("date", {
                        required: "This field is required",
                    })}
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                    margin="normal"
                    type="datetime-local"
                    fullWidth
                    label="Date"
                    name="date"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
        </Create>
    );
};
