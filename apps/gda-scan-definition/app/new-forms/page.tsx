import IntegratedForm from "./components/IntegratedForm";
import QexafsComponent from "./components/QexafsComponent";
import { initialState, QexafsContextProvider } from "./components/QexafsContextProvider";

export default function NewForms() {
  return (
    <div>
      <QexafsContextProvider startingValue={initialState} >
        <h2>test</h2>
        <IntegratedForm />
        <QexafsComponent />
      </QexafsContextProvider>
    </div>
  );
}
