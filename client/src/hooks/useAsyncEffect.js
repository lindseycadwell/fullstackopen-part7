import { useEffect } from "react";

function useAsyncEffect(callback, dependencies = []) {
  useEffect(() => {
    (async () => await callback())();
  }, dependencies);
}

export default useAsyncEffect;
