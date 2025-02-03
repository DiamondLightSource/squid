import {
  ConfigContext,
  ConfigContextProvider,
} from "../forms/components/ConfigContext";

const startingContext: ConfigContext = {
  beamlineIdentifier: "i18",
  configUrl: "/tmp/qexafs/experiment_1",
};

export default function NewForms() {
  return (
    <div>
      <ConfigContextProvider startingValue={startingContext}>
        <h2>test</h2>
      </ConfigContextProvider>
    </div>
  );
}
