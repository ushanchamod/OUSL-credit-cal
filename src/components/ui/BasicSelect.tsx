import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    setValue
}: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        const { target: { value } } = event;
        setValue(value);
    };

    return (
        <div className='box-border overflow-hidden w-full' >
            <FormControl
                sx={{
                    mt: 1,
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
                <InputLabel id="demo-simple-select-label" sx={{
                    background: "#fff",
                    padding: "0 5px 0 2px",
                }}>{
                        label
                    }</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Age"
                    onChange={handleChange}
                >
                    {
                        options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}
