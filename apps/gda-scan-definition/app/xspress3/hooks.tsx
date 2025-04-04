import { useEffect, useState } from "react";
import { Xspress3ConfigSchemaType } from "../schemas/xspress3";
import { readXspress3Definition } from "./action";


// export const updateConfig = async (
//   dispatch: React.Dispatch<QexafsAction>,
//   newConfig: FullQexafsSchemaType
// ) => {
//   dispatch({ type: "START_CONFIG_UPDATE" });

//   try {
//     const response = await updateScanDefinition(newConfig);
//     if (response === undefined) {
//       dispatch({ type: "CONFIG_ERROR", payload: "Error updating configuration" });
//     } else {
//       dispatch({ type: "CONFIG_UPDATE_SUCCESS" });
//     }
//   } catch (error) {
//     dispatch({ type: "CONFIG_ERROR", payload: "Config server error" });
//   }
// };

// todo add the update logic
export const useXspress3Configuration = () => {
  const [config, setConfig] = useState<Xspress3ConfigSchemaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await readXspress3Definition();
        if(response?.data){
          setConfig(response.data.data); // Assuming API returns an array of strings
        }

      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
};


// export const usePlanByName = (name: string) => {
//   const [plan, setPlan] = useState<{ name: string; schema: any } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!name) return;

//     setLoading(true);
//     api.get(`/plans/${name}`)
//       .then((response) => {
//         setPlan(response.data);
//       })
//       .catch((err) => {
//         console.log(`response: ${err}`)
//         console.log(`name: ${name}`);
//         console.dir(name);
//         setError(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [name]);

//   return { plan, loading, error };

// }