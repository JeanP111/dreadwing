import DosPage from "./components/Dos/DosPage.js";
import LostPassword from './components/Registration-Menu/LostPassword';

export const defaultRoutes = {
    DOSPAGE: "/dospage",
    LOSTPASSWORD: "/lostpassword",
}

export const routes = [
    {
        "route": "/dospage",
        "element": <DosPage commandLine="COMMAND.COM" />
    },
    {
        "route": "/lostpassword",
        "element": <LostPassword/>
    },
];
