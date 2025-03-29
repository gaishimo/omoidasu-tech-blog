import { CanvasKitInitOptions } from "canvaskit-wasm"
import CanvasKitInit from "canvaskit-wasm/bin/full/canvaskit"
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic"
import { ComponentType, Suspense, useMemo } from "react"

type Props = {
  getComponent: () => Promise<{ default: ComponentType }>
  fallback?: (loadingProps: DynamicOptionsLoadingProps) => JSX.Element | null
  opts?: Parameters<typeof LoadSkiaWeb>[0]
  delay?: number // to avoid canvas error: Expected null or instance of Picture, got an instance of Picture
}

/**
 * WithSkia component using Next.js dynamic with SSR disabled
 */
export function WithSkia(props: Props) {
  const Inner = useMemo(() => {
    return dynamic(
      async () => {
        try {
          // Wait for the specified delay if provided
          if (props.delay && props.delay > 0) {
            await new Promise(resolve => setTimeout(resolve, props.delay))
          }

          await LoadSkiaWeb(props.opts)
          return props.getComponent()
        } catch (err) {
          console.error("Failed to load Skia component:", err)
          return () => null // Return empty component on error
        }
      },
      {
        ssr: false,
        // Using loading option because fallback doesn't work properly
        loading: props.fallback,
      },
    )
  }, [props.getComponent, props.fallback, props.opts, props.delay])

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
