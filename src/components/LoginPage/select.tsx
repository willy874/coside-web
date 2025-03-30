import  React, { useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { jobPosition } from '@/constant/index';


export default function SelectLabels({ value, onChange, id, name, label, error, helperText }) {
  const [position, setPosition] = React.useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
    onChange(event)
  };

  const [positionArray, setPositionArray] = useState([
    "UI 設計師", 
    "UX 設計師", 
    "UIUX/產品設計師", 
    "使用者研究員",
    "前端工程師",
    "後端工程師",
    "全端工程師",
    "PM",
    "其他"
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
          {/* 改成 jobPosition  */}
          {jobPosition.map((item, index) => { 
            return <MenuItem value={item.value} key={index} >{item.label}</MenuItem> 
                })
            }
          {/* 改成 positionArray  */}
          {/* {positionArray.map((item, index) => { 
            return <MenuItem value={item} key={index} >{item}</MenuItem> 
                })
            } */}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
}
