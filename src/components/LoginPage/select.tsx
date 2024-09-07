import  React, { useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function SelectLabels({ value, onChange, id, name, label, error, helperText }) {
  const [position, setPosition] = React.useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
    onChange(event)
  };

  const [positionArray, setPositionArray] = useState([
    "UI Designer", 
    "UX Designer", 
    "(UI/UX)Product Designer", 
    "User Researcher",
    "前端工程師",
    "後端工程師",
    "全端工程師",
    "PM(Project Manager)",
    "其他職位"
  ]);

  useEffect(() => {
    // axios.get('https://api.github.com/users/xiaoxiaoxu/repos')
  }, []);
  return (
    <div>
      <FormControl sx={{ minWidth: '100%' }} error={error}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id={id}
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
          sx={{ borderRadius: '12px' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {positionArray.map((item, index) => { 
            return <MenuItem value={item} key={index} >{item}</MenuItem> 
                })
            }
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}

