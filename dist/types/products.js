// export type Product = {
//   id: number
//   name: string
//   image: string
//   description: string
//   categories: number[]
//   variants: string[]
//   sizes: string[]
// }
import { z } from "zod";
// import { productSchema } from "../schemas/productSchema.js"
// // to get the type FROM the ZOD validation
// type ProductDTO = z.infer<typeof productSchema>
// // we are adding an ID because, when we validate the data we don't care about the id. why?? because IDs are handled by the database
// export type Product = ProductDTO & { id: number }
export const productSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    price: z.number({
        required_error: "Price is required",
    }),
    image: z.string({
        required_error: "Image URL is required",
    }),
});
