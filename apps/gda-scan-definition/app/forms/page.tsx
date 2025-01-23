"use client";

import { IDEProvider } from "../components/ideReducer";
import { ConfigContext, ConfigContextProvider } from "./components/ConfigContext";
import FormWithDiffViewer from "./components/FormWithDiff";

const startingContext: ConfigContext = {
    beamlineIdentifier: "i18",
    configUrl: "/tmp/qexafs/experiment_1"
};

export default function FormsPage() {
    return <div>
        <IDEProvider>
            <ConfigContextProvider startingValue={startingContext} >
                <FormWithDiffViewer />
            </ConfigContextProvider>
        </IDEProvider>
    </div >
}
