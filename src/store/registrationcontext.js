import { createContext, useState } from "react";

const Registrationcontext = createContext();
export function Registrationprovider(props) {
    const [userdata, setuserdata] = useState({});
    function saveuserdata(data) {
        setuserdata((prevData) => ({ ...prevData, ...data }))
        console.log(userdata)
    }
    return <Registrationcontext.Provider value={{ userdata, saveuserdata }}>{props.children}</Registrationcontext.Provider>

}
export default Registrationcontext;