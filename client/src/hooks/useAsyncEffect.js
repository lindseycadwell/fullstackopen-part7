import { useEffect } from "react";

function useAsyncEffect(callback, dependencies = []) {
  useEffect(() => {
    (async () => {
      console.log("inside useEffect() inside useAsyncEffect()");
      return await callback();
    })();
  }, dependencies);
}

export default useAsyncEffect;
