import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export default function BasicSelect({
  options,
  label,
  value,
  setValue,
}: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return (
    <div className="box-border overflow-hidden w-full">
      <FormControl
        sx={{
          mt: 1,
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e5e5e5",
            },
            "&:hover fieldset": {
              borderColor: "#D06718",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D06718",
            },
          },
          "& label.Mui-focused": {
            color: "#D06718",
          },
        }}
        size="small"
      >
        <InputLabel
          id={`${label}-select-label`}
          sx={{
            background: "#fff",
            padding: "0 5px 0 2px",
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
