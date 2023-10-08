export const cn = (cn: (string | undefined)[]) =>
  cn.filter((el) => el).join(" ");
