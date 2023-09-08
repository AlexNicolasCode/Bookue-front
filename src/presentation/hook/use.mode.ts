import { useContext } from "react";

import { ModeContext } from "../contexts";

export const useMode = () => useContext(ModeContext)