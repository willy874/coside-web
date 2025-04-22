import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { jobPosition } from '@/constant/index';
import TextField from '@mui/material/TextField';

export default function SelectLabels({ value, onChange, id, name, label, error, helperText }) {
  const [position, setPosition] = React.useState(value);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setPosition(selectedValue);
    onChange(event);
    // setShowOtherInput(selectedValue === "其他");
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
          {jobPosition.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>    
    </div>
  );
}
