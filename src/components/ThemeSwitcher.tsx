import { useEffect, useState } from 'react'

import { InputSwitch } from 'primereact/inputswitch';

interface ThemeSetter {
    (theme: string): void
}

const validThemes = ["dark", "light"];
const defaultTheme = "light";
const themeLsKey = "theme";

function setThemeToLs(theme: string) {
    localStorage.setItem(themeLsKey, theme);
}

function getThemeFromLs(): string {
    const lsTheme = localStorage.getItem(themeLsKey) ?? defaultTheme;
    if (!validThemes.includes(lsTheme)) {
        console.error("invalid theme in localStorage: '%s', falling back to light", lsTheme)
        setThemeToLs(defaultTheme);
        return defaultTheme;
    }
    return lsTheme;
}

function useTheme(): [string, ThemeSetter] {
    const [theme, setTheme] = useState(getThemeFromLs());
    const themedElement = document.documentElement;
    useEffect(() => {
        themedElement.classList.add(theme)
    });
    return [theme, (newTheme: string) => {
        setThemeToLs(newTheme)
        themedElement.classList.replace(theme, newTheme)
        setTheme(newTheme)
    }]
}

export function ThemeSwitcher(): JSX.Element {
    const [theme, setTheme] = useTheme();
    return <div className='flex align-items-center'>
        <i className='pi pi-sun text-2xl' />
        <InputSwitch className='mx-2' checked={theme === 'dark'} onChange={(e) => { setTheme(e.value ? 'dark' : 'light') }} />
        <i className='pi pi-moon text-2xl' />
    </div>;
}