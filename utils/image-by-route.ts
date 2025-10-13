import type { CardImage, ImageRoute } from "~/types"

export const getImageByRoute = (route: string, item?: string): CardImage => {
  return {
    imageName: `${route}_${item}`,
    imageRoute: route as ImageRoute
  }
}