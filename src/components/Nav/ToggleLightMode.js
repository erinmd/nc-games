import { ThemeContext } from '../../contexts/Theme'
import { Switch } from '@mui/material';
import { useContext } from 'react';

export const ToggleLightMode = () => {
  const {theme, setTheme} = useContext(ThemeContext) 
  const checked = theme ==='light' ? true : false

  const onChange = () => {
    setTheme(checked?'dark':'light')
  }
  return (
    <section className="ToggleLightMode">
      <p className="ToggleLightMode--inline-text">Dark</p>
      <Switch
        checked={checked}
        onChange={onChange}
        size="large"
        color="default"
        inputProps={{ 'aria-label': 'Dark Mode Toggle' }}
      />
      <p className="ToggleLightMode--inline-text">Light</p>
    </section>
  );
};

export default ToggleLightMode;
