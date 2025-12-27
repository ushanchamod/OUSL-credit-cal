import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface Props {
  label: string;
  state: string[];
  stateName: string[];
  setStateName: (value: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, stateName: readonly string[], theme: Theme) {
  return {
    fontWeight: stateName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({
  label,
  state,
  stateName,
  setStateName,
}: Props) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof stateName>) => {
    const {
      target: { value },
    } = event;
    setStateName(typeof value === "string" ? value.split(",") : value);
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
          id={`${label}-multiple-chip-label`}
          sx={{
            background: "#fff",
            padding: "0 5px 0 2px",
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-multiple-chip-label`}
          id={`${label}-multiple-chip`}
          multiple
          value={stateName}
          onChange={handleChange}
          input={
            <OutlinedInput id={`${label}-select-multiple-chip`} label={label} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {state.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, stateName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
