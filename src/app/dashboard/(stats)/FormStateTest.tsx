// "use client";

// import { useFormState, useFormStatus } from "react-dom";
// import { addToCart } from "./actions";

// const AddToCartForm = ({
//   itemID,
//   itemTitle,
// }: {
//   itemID: string;
//   itemTitle: string;
// }) => {
//   const [formState, formAction] = useFormState(addToCart, {});

//   return (
//     <form action={formAction}>
//       <h2>{itemTitle}</h2>
//       <input type="hidden" name="itemID" value={itemID} />
//       <SubmitButton />
//       {formState?.success && (
//         <div className="toast">
//           Added to cart! Your cart now has {formState.cartSize} items.
//         </div>
//       )}
//       {formState?.success === false && (
//         <div className="error">Failed to add to cart: {formState.message}</div>
//       )}
//     </form>
//   );
// };

// const SubmitButton = () => {
//   const status = useFormStatus();

//   return (
//     <button type="submit">
//       {status.pending ? "Loading..." : "Add to Cart"}
//     </button>
//   );
// };

// const FormStateTest = () => {
//   return (
//     <>
//       <AddToCartForm itemID="1" itemTitle="FormState: Success test" />
//       <AddToCartForm itemID="2" itemTitle="FormState: Fail test" />
//     </>
//   );
// };

// export default FormStateTest;
