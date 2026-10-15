import {Button, Stack, TextField} from "@mui/material";
import {type ChangeEvent, useRef, useState} from "react";

interface Props {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const FileInput = ({name, label, onChange}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        name={name}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          disabled
          value={fileName}
          sx={{ width: '100%' }}
          label={label}
        />
        <Button
          variant="contained"
          onClick={activateInput}
        >
          Browse
        </Button>
      </Stack>
    </>
  );
};

export default FileInput;