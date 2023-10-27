"use server";

export type PrevState = {
  success?: boolean;
  cartSize?: number;
  message?: string;
};

export async function addToCart(prevState: PrevState, queryData: FormData) {
  await new Promise((res) => setTimeout(res, 3000));
  const itemID = queryData.get("itemID");
  if (itemID === "1") {
    return {
      success: true,
      cartSize: prevState.cartSize ? prevState.cartSize + 1 : 12,
    };
  } else {
    return {
      success: false,
      message: "The item is sold out.",
    };
  }
}
