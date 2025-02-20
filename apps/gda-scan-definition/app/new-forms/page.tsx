import IntegratedForm from "./components/IntegratedForm";
import QexafsComponent from "./components/QexafsComponent";
import { initialState, QexafsContextProvider } from "./components/QexafsContextProvider";

export default function NewForms() {
  return (
    <div>
      <QexafsContextProvider startingValue={initialState} >
        <IntegratedForm />
        {/* <QexafsComponent /> */}
      </QexafsContextProvider>
    </div>
  );
}
