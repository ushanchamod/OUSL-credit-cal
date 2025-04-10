import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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
  setStateName
}: Props) {
  const theme = useTheme();

  // Set all items in state as the default selected options if stateName is empty
  //   React.useEffect(() => {
  //     if (stateName.length === 0 && state.length > 0) {
  //       setStateName(state);  // Select all options by default
  //     }
  //   }, [state, stateName, setStateName]);

  const handleChange = (event: SelectChangeEvent<typeof stateName>) => {
    const {
      target: { value },
    } = event;
    setStateName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl
  sx={{
    m: 1,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: "#D06718",
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
    id="demo-multiple-chip-label"
    sx={{
      background: "#fff",
      padding: "0 5px 0 2px",
    }}
  >
    {label || ""}
  </InputLabel>
  <Select
    labelId="demo-multiple-chip-label"
    id="demo-multiple-chip"
    multiple
    value={stateName}
    onChange={handleChange}
    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((value) => (
          <Chip key={value} label={value} />
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
