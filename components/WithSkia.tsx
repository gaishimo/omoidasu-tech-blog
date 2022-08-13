import { CanvasKitInitOptions } from "canvaskit-wasm"
import CanvasKitInit from "canvaskit-wasm/bin/full/canvaskit"
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic"
import { ComponentType, Suspense, useMemo } from "react"
import { wait } from "../utils/wait"

type Props = {
  getComponent: () => Promise<{ default: ComponentType }>
  fallback?: (loadingProps: DynamicOptionsLoadingProps) => JSX.Element | null
  opts?: Parameters<typeof LoadSkiaWeb>[0]
}

/**
 * WithSkiaWebをnext.jsのdynamicに変更したもの (ssr: false)
 */
export function WithSkia(props: Props) {
  const Inner = useMemo(() => {
    return dynamic(
      async () => {
        await wait(5000)
        await LoadSkiaWeb(props.opts)
        return props.getComponent()
      },
      {
        ssr: false,
        // fallbackがうまく効かないためloadingオプションを利用
        loading: props.fallback,
      },
    )
  }, [props.getComponent, props.fallback, props.opts])

  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}

const LoadSkiaWeb = async (opts?: CanvasKitInitOptions) => {
  if (global.CanvasKit !== undefined) {
    return
  }
  const CanvasKit = await CanvasKitInit(opts)
  // The CanvasKit API is stored on the global object and used
  // to create the JsiSKApi in the Skia.web.ts file.
  global.CanvasKit = CanvasKit
}
