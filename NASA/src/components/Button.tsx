import * as React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    text: string;
    onclick: ()=> void;
}

export default function ButtonUsage({text, onclick}: ButtonProps) {
  return <Button variant="contained" onClick={onclick}>{text}</Button>;
}