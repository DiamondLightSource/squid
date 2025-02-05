import { createContext, useReducer } from "react";
import { QexafsContextProvider } from "../../new-forms/components/QexafsContextProvider";
import { FullQexafsSchemaType, initFullQexafsSchema as initFullQexafsConfig, qexafsParametersSchema } from "../../schemas/qexafs";


export const XmlQexafsConfigContext = createContext<FullQexafsSchemaType | null>(null);

export const XmlQexafsConfigContextDispatch = createContext<React.Dispatch<XmlQexafsConfigContextAction> | null>(null);

type XmlQexafsConfigContextAction =
    | { type: "START_CONFIG_READ"; payload: FullQexafsSchemaType }
    | { type: "START_CONFIG_UPDATE"; payload: Partial<FullQexafsSchemaType> };

function xmlQexafsConfigReducer(state: FullQexafsSchemaType, action: XmlQexafsConfigContextAction): FullQexafsSchemaType {

    switch (action.type) {
        case "START_CONFIG_READ":
            return action.payload;
        case "START_CONFIG_UPDATE":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export function XmlQexafsConfigContextProvider() {
    const [state, dispatch] = useReducer(xmlQexafsConfigReducer, initFullQexafsConfig);
    return <div>
        <h3>XmlQexafsConfigContextProvider temporarily disabled </h3>
    </div>
}
