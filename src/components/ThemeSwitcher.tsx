import { useEffect, useState } from 'react'

import { InputSwitch } from 'primereact/inputswitch';

interface ThemeSetter {
    (theme: string): void
}

function useTheme(): [string, ThemeSetter] {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
    const themedElement = document.documentElement;
    useEffect(() => {
        themedElement.classList.add(theme)
    });
    return [theme, (newTheme: string) => {
        localStorage.setItem("theme", newTheme)
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